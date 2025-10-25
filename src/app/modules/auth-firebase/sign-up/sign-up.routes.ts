import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth-firebase/sign-up/sign-up.component';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';

export default [
    {
        path: '',
        component: AuthSignUpComponent,
        resolve: {
            countries: () => inject(ContactsService).getCountries(),
        },

    },
] as Routes;
