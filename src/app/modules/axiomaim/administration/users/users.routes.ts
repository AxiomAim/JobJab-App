import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { UsersComponent } from 'app/modules/axiomaim/administration/users/users.component';
import { UsersDetailsComponent } from 'app/modules/axiomaim/administration/users/details/details.component';
import { UsersListComponent } from 'app/modules/axiomaim/administration/users/list/list.component';
import { of } from 'rxjs';
import { UsersV2Service } from './users-v2.service';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const userResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _usersV2Service = inject(UsersV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _usersV2Service.getItem(oid).catch((error) => {
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
    component: UsersDetailsComponent,
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
        component: UsersComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: UsersListComponent,
                resolve: {
                    users: () => inject(UsersV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: UsersDetailsComponent,
                        resolve: {
                            // userRoles: () => inject(UsersV2Service).getUserRoles(),
                            user: userResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
