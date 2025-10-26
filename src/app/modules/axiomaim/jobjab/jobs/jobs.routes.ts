import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { JobsComponent } from 'app/modules/axiomaim/jobjab/jobs/jobs.component';
import { JobsDetailsComponent } from 'app/modules/axiomaim/jobjab/jobs/details/details.component';
import { JobsListComponent } from 'app/modules/axiomaim/jobjab/jobs/list/list.component';
import { of } from 'rxjs';
import { JobsV2Service } from './jobs-v2.service';


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
    const _contactsV2Service = inject(JobsV2Service);
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
    component: JobsDetailsComponent,
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
        component: JobsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: JobsListComponent,
                resolve: {
                    jobs: () => inject(JobsV2Service).getAll(),
                },
                children: [
                    {
                        path: ':id',
                        component: JobsDetailsComponent,
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
