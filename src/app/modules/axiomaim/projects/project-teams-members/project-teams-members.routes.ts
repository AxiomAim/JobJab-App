import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { of } from 'rxjs';
import { ProjectTeamsMembersV2Service } from './project-teams-members-v2.service';
import { ProjectTeamsMembersDetailsComponent } from './details/details.component';
import { ProjectTeamsMembersComponent } from './project-teams-members.component';
import { ProjectTeamsMembersListComponent } from './list/list.component';


/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const projectTeamResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _productsV2Service = inject(ProjectTeamsMembersV2Service);
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
    component: ProjectTeamsMembersDetailsComponent,
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
        component: ProjectTeamsMembersComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: ProjectTeamsMembersListComponent,
                resolve: {
                    projectTeams: () => inject(ProjectTeamsMembersV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: ProjectTeamsMembersDetailsComponent,
                        resolve: {
                            // userRoles: () => inject(ProductsV2Service).getUserRoles(),
                            projectTeam: projectTeamResolver,
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
