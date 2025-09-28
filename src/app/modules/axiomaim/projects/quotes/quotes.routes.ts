import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { of } from 'rxjs';
import { QuotesV2Service } from './quotes-v2.service';
import { QuotesDetailsComponent } from './details/details.component';
import { QuotesComponent } from './quotes.component';
import { QuotesListComponent } from './list/list.component';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const quoteResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _productsV2Service = inject(QuotesV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _productsV2Service.getItem(oid).catch((error) => {
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
 * Can deactivate users details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateUsersDetails = (
    component: QuotesDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/users'
    // it means we are navigating away from the
    // users app
    if (!nextState.url.includes('/users')) {
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
        component: QuotesComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: QuotesListComponent,
                resolve: {
                    users: () => inject(QuotesV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: QuotesDetailsComponent,
                        resolve: {
                            // userRoles: () => inject(ProductsV2Service).getUserRoles(),
                            user: quoteResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
