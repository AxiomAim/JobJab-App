import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { RequestsComponent } from 'app/modules/axiomaim/jobjab/requests/requests.component';
import { RequestsDetailsComponent } from 'app/modules/axiomaim/jobjab/requests/details/details.component';
import { RequestsListComponent } from 'app/modules/axiomaim/jobjab/requests/list/list.component';
import { of } from 'rxjs';
import { RequestsV2Service } from './requests-v2.service';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const contactResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _contactsV2Service = inject(RequestsV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _contactsV2Service.getItem(oid).catch((error) => {
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
    component: RequestsDetailsComponent,
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
    if (!nextState.url.includes('/requests')) {
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

export default [
    {
        path: '',
        component: RequestsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: RequestsListComponent,
                resolve: {
                    jobs: () => inject(RequestsV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: RequestsDetailsComponent,
                        resolve: {
                            job: contactResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
