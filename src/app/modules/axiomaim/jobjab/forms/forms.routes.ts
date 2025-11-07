import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanDeactivateFn,
    ResolveFn,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { of } from 'rxjs';
import { FormsComponent } from './forms.component';
import { FormsListComponent } from './list/list.component';
import { FormsV2Service } from './forms-v2.service';
import { FormsDetailsComponent } from './details/details.component';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const formResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _formsV2Service = inject(FormsV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _formsV2Service.getItem(oid).catch((error) => {
        // Log the error
        console.error('Error fetching site:', error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        router.navigateByUrl(parentUrl);

        // Return an observable that emits an error or a default value
        return of(null); // Or throwError(() => error); if you want the routing to potentially fail
    });
};

/**
 * Can deactivate contacts details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateUsersDetails = (
    component: FormsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/contacts'
    // it means we are navigating away from the
    // contacts app
    if (!nextState.url.includes('/forms')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another user...
    if (nextRoute.paramMap.get('id')) {
        // Just navigate
        return true;
    }

    // Otherwise, close the drawer first, and then navigate
    return component.closeDrawer().then(() => true);
};

// CanDeactivate: Close drawer before navigating away
const canDeactivateFormsDetails: CanDeactivateFn<FormsDetailsComponent> = (
  component: FormsDetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
): Promise<boolean> | boolean => {
  // Allow navigation outside /forms
  if (!nextState.url.includes('/forms')) {
    return true;
  }

  // Allow navigation to another form detail
  const nextId = nextState.root.firstChild?.paramMap.get('id');
  if (nextId && nextId !== currentRoute.paramMap.get('id')) {
    return true;
  }

  // Otherwise, close drawer first
  return component.closeDrawer().then(() => true);
};

// List resolver
const formsListResolver: ResolveFn<any> = () => {
  return inject(FormsV2Service).getAll();
};

export default [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: '',
        component: FormsListComponent,
        resolve: {
          forms: formsListResolver,
        },
        children: [
          {
            path: ':id',
            component: FormsDetailsComponent,
            resolve: {
              form: formResolver,
            },
            canDeactivate: [canDeactivateFormsDetails],
          },
        ],
      },
    ],
  },
] as Routes;
