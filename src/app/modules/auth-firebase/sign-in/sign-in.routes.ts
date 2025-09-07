import { Routes } from '@angular/router';
import { AuthFirebaseSignInComponent } from 'app/modules/auth-firebase/sign-in/sign-in.component';

export default [
    {
        path: '',
        component: AuthFirebaseSignInComponent,
    },
] as Routes;
