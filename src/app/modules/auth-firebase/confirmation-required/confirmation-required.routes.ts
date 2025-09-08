import { Routes } from '@angular/router';
import { AuthConfirmationRequiredComponent } from 'app/modules/auth-firebase/confirmation-required/confirmation-required.component';

export default [
    {
        path: '',
        component: AuthConfirmationRequiredComponent,
    },
] as Routes;
