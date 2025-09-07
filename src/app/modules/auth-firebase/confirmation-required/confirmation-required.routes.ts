import { Routes } from '@angular/router';
import { AuthFirebaseConfirmationRequiredComponent } from 'app/modules/auth-firebase/confirmation-required/confirmation-required.component';

export default [
    {
        path: '',
        component: AuthFirebaseConfirmationRequiredComponent,
    },
] as Routes;
