import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { ContactsComponent } from 'app/modules/axiomaim/crm/contacts/contacts.component';
import { ContactsDetailsComponent } from 'app/modules/axiomaim/crm/contacts/details/details.component';
import { ContactsListComponent } from 'app/modules/axiomaim/crm/contacts/list/list.component';
import { of } from 'rxjs';
import { ContactsV2Service } from './contacts-v2.service';
import { ContactsService } from '../../apps/contacts/contacts.service';
import { SourcesV2Service } from '../sources/sources-v2.service';


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
    const _contactsV2Service = inject(ContactsV2Service);
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
    component: ContactsDetailsComponent,
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
        component: ContactsComponent,
        resolve: {
        },
        children: [
            {
                path: '',
                component: ContactsListComponent,
                resolve: {
                    contacts: () => inject(ContactsV2Service).getAll(),
                    countries: () => inject(ContactsService).getCountries(),
                    sources: () => inject(SourcesV2Service).getAll(),
                    emailLabels: () => inject(ContactsV2Service).getEmailLabels(),
                    phoneLabels: () => inject(ContactsV2Service).getPhoneLabels(),
                },
                children: [
                    {
                        path: ':id',
                        component: ContactsDetailsComponent,
                        resolve: {
                            contact: contactResolver,
                            sources: () => inject(SourcesV2Service).getAll(),
                            emailLabels: () => inject(ContactsV2Service).getEmailLabels(),
                            phoneLabels: () => inject(ContactsV2Service).getPhoneLabels(),
                        },
                        canDeactivate: [canDeactivateUsersDetails],
                    },
                ],
            },
        ],
    },
] as Routes;
