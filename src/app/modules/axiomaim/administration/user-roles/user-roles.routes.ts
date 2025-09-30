import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { UserRolesComponent } from 'app/modules/axiomaim/administration/user-roles/user-roles.component';
import { UserRolesDetailsComponent } from 'app/modules/axiomaim/administration/user-roles/details/details.component';
import { UserRolesListComponent } from 'app/modules/axiomaim/administration/user-roles/list/list.component';
import { of } from 'rxjs';
import { UserRolesV2Service } from './user-roles-v2.service';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const userRoleResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _userRolesV2Service = inject(UserRolesV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _userRolesV2Service.getItem(oid).catch((error) => {
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

    // If the next state doesn't contain '/users'
    // it means we are navigating away from the
    // users app
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
                            // userRoles: () => inject(UsersV2Service).getUserRoles(),
                            userRole: userRoleResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
