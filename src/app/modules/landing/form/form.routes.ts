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
    const id = route.paramMap.get('id');
    
    if (!id) {
        // Optional: Handle missing ID early
        router.navigateByUrl('/');
        return of(null);
    }
    
    return _formsV2Service.getItem(id)
        .then((res) => res)  // Explicitly return res on success
        .catch((error) => {
            console.error('Error fetching form:', error);
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            router.navigateByUrl(parentUrl);
            return of(null);
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