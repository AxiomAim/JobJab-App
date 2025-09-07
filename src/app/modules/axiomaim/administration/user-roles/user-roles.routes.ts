import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { UserRolesComponent } from 'app/modules/davesa/administration/user-roles/user-roles.component';
import { UserRolesDetailsComponent } from 'app/modules/davesa/administration/user-roles/details/details.component';
import { UserRolesListComponent } from 'app/modules/davesa/administration/user-roles/list/list.component';
import { catchError, throwError } from 'rxjs';
import { UserRolesV2Service } from './userRolesV2.service';

/**
 * User resolver
 *
 * @param route
 * @param state
 */
const userRolesResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const userRolesV2Service = inject(UserRolesV2Service);
    const router = inject(Router);

    return userRolesV2Service.getById(route.paramMap.get('id')).pipe(
        // Error here means the requested user is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

/**
 * Can deactivate user-roles details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateUserRolesDetails = (
    component: UserRolesDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/user-roles'
    // it means we are navigating away from the
    // user-roles app
    if (!nextState.url.includes('/user-roles')) {
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
        component: UserRolesComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: UserRolesListComponent,
                resolve: {
                    userRoles: () => inject(UserRolesV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: UserRolesDetailsComponent,
                        resolve: {
                            userRoles: userRolesResolver,
                        },
                        canDeactivate: [canDeactivateUserRolesDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
