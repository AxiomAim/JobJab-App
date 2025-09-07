import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { OrganizationsComponent } from 'app/modules/davesa/administration/organizations/organizations.component';
import { OrganizationsDetailsComponent } from 'app/modules/davesa/administration/organizations/details/details.component';
import { OrganizationsListComponent } from 'app/modules/davesa/administration/organizations/list/list.component';
import { catchError, throwError } from 'rxjs';
import { OrganizationsV2Service } from './organizationsV2.service';

/**
 * Organization resolver
 *
 * @param route
 * @param state
 */
const organizationResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _organizationsV2Service = inject(OrganizationsV2Service);
    const router = inject(Router);

    return _organizationsV2Service.getById(route.paramMap.get('id')).pipe(
        // Error here means the requested organization is not available
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
 * Can deactivate organizations details
 *
 * @param component
 * @param currentRoute
 * @param currentState
 * @param nextState
 */
const canDeactivateOrganizationsDetails = (
    component: OrganizationsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }

    // If the next state doesn't contain '/organizations'
    // it means we are navigating away from the
    // organizations app
    if (!nextState.url.includes('/organizations')) {
        // Let it navigate
        return true;
    }

    // If we are navigating to another organization...
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
        component: OrganizationsComponent,
        resolve: {
        },
        children: [
            {
                path: 'compose',
                pathMatch: 'full',
                component: OrganizationsComponent,
            },
    {
                path: '',
                component: OrganizationsListComponent,
                resolve: {
                    organizations: () => inject(OrganizationsV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: OrganizationsDetailsComponent,
                        resolve: {
                            organization: organizationResolver,
                        },
                        canDeactivate: [canDeactivateOrganizationsDetails],
                    },
                ],
            },
        ],
    },
] as Routes;