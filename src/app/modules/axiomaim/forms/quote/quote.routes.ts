import { Routes } from '@angular/router';
import { QuoteComponent } from './quote.component';
import { inject } from '@angular/core';
import { ContactsService } from '../../apps/contacts/contacts.service';

export default [
    {
        path: '',
        component: QuoteComponent,
        resolve: {
            countries: () => inject(ContactsService).getCountries(),
        },

    },
] as Routes;
