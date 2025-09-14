import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { of } from 'rxjs';
import { ProductsV2Service } from './products-v2.service';
import { ProductsDetailsComponent } from './details/details.component';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './list/list.component';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const productResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _productsV2Service = inject(ProductsV2Service);
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
    component: ProductsDetailsComponent,
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
        component: ProductsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: ProductsListComponent,
                resolve: {
                    users: () => inject(ProductsV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: ProductsDetailsComponent,
                        resolve: {
                            // userRoles: () => inject(ProductsV2Service).getUserRoles(),
                            user: productResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
