import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { FormsV2Service } from 'app/modules/axiomaim/jobjab/forms/forms-v2.service';
import { LandingFormComponent } from 'app/modules/landing/form/form.component';
import { of } from 'rxjs';

/**
 * Site resolver
 *
 * @param route
 * @param state
 */
const formResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _formsV2Service = inject(FormsV2Service);
    const router = inject(Router);
    const oid = route.paramMap.get('id');
    
    return _formsV2Service.getItem(oid).catch((error) => {
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

export default [
    {
        path: ':id',
        component: LandingFormComponent,
        resolve: {
            form: formResolver,
        },

    },
] as Routes;
