import { Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth-firebase/sign-in/sign-in.component';

export default [
    {
        path: '',
        component: AuthSignInComponent,
    },
] as Routes;
