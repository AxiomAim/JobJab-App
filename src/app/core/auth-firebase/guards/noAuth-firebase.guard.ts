import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { FirebaseAuthV2Service } from '../firebase-auth-v2.service';


export const NoFirebaseAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(FirebaseAuthV2Service)
        .check()
        .pipe(
            switchMap((authenticated) => {
                console.log('NoFirebaseAuthGuard', authenticated)

                // If the user is authenticated...
                if (authenticated) {
                    return of(router.parseUrl(''));
                }

                // Allow the access
                return of(true);
            })
        );
};
