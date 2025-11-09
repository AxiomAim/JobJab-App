import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { QueriesComponent } from 'app/modules/axiomaim/jobjab/queries/queries.component';
import { QueriesDetailsComponent } from 'app/modules/axiomaim/jobjab/queries/details/details.component';
import { QueriesListComponent } from 'app/modules/axiomaim/jobjab/queries/list/list.component';
import { of } from 'rxjs';
import { QueriesV2Service } from './queries-v2.service';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const queryResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _queriesV2Service = inject(QueriesV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _queriesV2Service.getItem(oid).catch((error) => {
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
    component: QueriesDetailsComponent,
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
    if (!nextState.url.includes('/contacts')) {
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
        component: QueriesComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: QueriesListComponent,
                resolve: {
                    queries: () => inject(QueriesV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: QueriesDetailsComponent,
                        resolve: {
                            query: queryResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
