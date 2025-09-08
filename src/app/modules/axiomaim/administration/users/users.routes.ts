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
import { catchError, map, throwError } from 'rxjs';
import { UsersV2_Service } from './usersV2.service';
import { LoginUserService } from 'app/core/login-user/login-user.service';

/**
 * User resolver
 *
 * @param route
 * @param state
 */
const usersResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const loginUserService = inject(LoginUserService);
    const usersV2Service = inject(UsersV2_Service);
    const router = inject(Router);
    loginUserService.getOrganization().subscribe(organization => {
        return usersV2Service.getAllByOrgId(organization.id).pipe(
            map((users) => {
                console.log('route:users', users);
            }), // Do nothing, just return the user  
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
    });

};

const userResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const usersV2Service = inject(UsersV2_Service);
    const router = inject(Router);

    return usersV2Service.getById(route.paramMap.get('id')).pipe(
        map((user) => {
            console.log('route:user', user);
        }), // Do nothing, just return the user  
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

const userOrgResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const usersV2Service = inject(UsersV2_Service);
    const router = inject(Router);

    return usersV2Service.getAllByOrgId(route.paramMap.get('orgId')).pipe(
        map((user) => {
            console.log('route:user', user);
        }), // Do nothing, just return the user  
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
                    loginUser: () => inject(UsersV2_Service).initialize(),
                    users: () => inject(UsersV2_Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: UsersDetailsComponent,
                        resolve: {
                            loginUser: () => inject(UsersV2_Service).initialize(),
                            userRoles: () => inject(UsersV2_Service).getUserRoles(),
                            user: userResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
