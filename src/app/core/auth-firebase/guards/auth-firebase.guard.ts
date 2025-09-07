import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { FirebaseAuthV2Service } from '../firebase-auth-v2.service';

export const AuthFirebaseGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const _router: Router = inject(Router);

    // Check the authentication status
    return inject(FirebaseAuthV2Service)
        .check()
        .pipe(
            take(1),
            map((authenticated) => {
                // If the user is not authenticated...
                if (!authenticated) {
                    // inject(FirebaseAuthV2Service).signOut();
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = state.url === '/sign-in' ? '' : `redirectURL=${state.url}`;
                    // Construct the UrlTree for the sign-in page
                    const urlTree = _router.parseUrl(`/sign-in?${redirectURL}`); 
                    _router.navigate(['/sign-in']);

                    return false; // Return the UrlTree 
                }

                // Allow the access
                return true; 
            })
        );
};