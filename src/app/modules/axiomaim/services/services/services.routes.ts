import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { ServiceOfferingBoardComponent } from 'app/modules/axiomaim/services/services/board/board.component';
import { ScrumboardBoardsComponent } from 'app/modules/axiomaim/services/services/boards/boards.component';
import { ScrumboardCardComponent } from 'app/modules/axiomaim/services/services/card/card.component';
import { Board } from 'app/modules/axiomaim/services/services/services.models';
import { ScrumboardService } from 'app/modules/axiomaim/services/services/services.service';
import { Observable, catchError, of, throwError, filter, combineLatest, map } from 'rxjs';
import { ServiceOfferingsV2Service } from './data-services/service-offerings-v2.service';
import { ServiceOfferingsListV2ApiService } from './data-services/service-offerings-list-v2-api.service';
import { query } from 'firebase/firestore';
import { ServiceOfferingListV2Service } from './data-services/service-offerings-list-v2.service';
import { ServicesV2Service } from './data-services/services-v2.service';
import { ServiceOffering } from './data-services/service-offerings.model';
import { ServiceOfferingList } from './data-services/service-offerings-list.model';

/**
 * Board resolver
 *
 * @param route
 * @param state
 */
const serviceOfferingResolver: ResolveFn<ServiceOffering> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _serviceOfferingsV2Service = inject(ServiceOfferingsV2Service);
    const _serviceOfferingListV2Service = inject(ServiceOfferingListV2Service);
    const _servicesV2Service = inject(ServicesV2Service);
    const router = inject(Router);
    const id = route.paramMap.get('id');
    console.log('serviceOfferingResolver', id);

    return combineLatest([
        _serviceOfferingsV2Service.getItem(id),
        _serviceOfferingListV2Service.getQuery('serviceOfferingId', '==', id),
        _servicesV2Service.getQuery('serviceOfferingId', '==', id)
    ]).pipe(
        map(([serviceOffering, serviceOfferingsList, services]) => {
            if (!serviceOffering) {
                const parentUrl = state.url.split('/').slice(0, -1).join('/');
                router.navigateByUrl(parentUrl);
                throw new Error('Service offering not found');
            }

            // Assuming ServiceOffering has a lists property of type ServiceOfferingList[]
            serviceOffering.lists = serviceOfferingsList
                .filter((item) => item.serviceOfferingId === id)
                .sort((a, b) => a.position - b.position);

            serviceOffering.lists.forEach((list: ServiceOfferingList) => {
                list.services = services.filter((item) => item.serviceOfferingListId === list.id)
                    .map((service) => ({
                        ...service,
                        // Add any additional mapping if needed
                    }));
            });

            return serviceOffering;
        }),
        catchError((error) => {
            console.error('Error fetching service offering data:', error);
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            router.navigateByUrl(parentUrl);
            return throwError(() => error);
        })
    );
};

const serviceOfferingListResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _serviceOfferingListV2Service = inject(ServiceOfferingListV2Service);
    const router = inject(Router);
    const id = route.paramMap.get('id');
        console.log('serviceOfferingListResolver', 'serviceOfferingId');
        console.log('serviceOfferingListResolver', '==');
        console.log('serviceOfferingListResolver', id);

    
    return _serviceOfferingListV2Service.getQuery('serviceOfferingId', '==', id).catch((error) => {
        // Log the error
        console.error('Error fetching serviceOfferingList:', error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        router.navigateByUrl(parentUrl);

        // Return an observable that emits an error or a default value
        return of(null); // Or throwError(() => error); if you want the routing to potentially fail
    });
};

const servicesResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _servicesV2Service = inject(ServicesV2Service);
    const router = inject(Router);
    const id = route.paramMap.get('id');
    
    return _servicesV2Service.getQuery('serviceOfferingId', '==', id).catch((error) => {
        // Log the error
        console.error('Error fetching serviceOfferingList:', error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        router.navigateByUrl(parentUrl);

        // Return an observable that emits an error or a default value
        return of(null); // Or throwError(() => error); if you want the routing to potentially fail
    });
};
/**
 * 
 * Card resolver
 *
 * @param route
 * @param state
 */
const cardResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const scrumboardService = inject(ScrumboardService);
    const router = inject(Router);

    return scrumboardService.getCard(route.paramMap.get('cardId')).pipe(
        // Error here means the requested card is not available
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

export default [
    {
        path: '',
        component: ScrumboardBoardsComponent,
        resolve: {
            boards: () => inject(ServiceOfferingsV2Service).getAll(),
        },
    },
    {
        path: ':id',
        component: ServiceOfferingBoardComponent,
        resolve: {
            serviceOffering: serviceOfferingResolver,
            serviceOfferingList: serviceOfferingListResolver,            
            services: servicesResolver,            
        },
        children: [
            {
                path: 'card/:cardId',
                component: ScrumboardCardComponent,
                resolve: {
                    card: cardResolver,
                },
            },
        ],
    },
] as Routes;
