import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CRMComponent } from 'app/modules/axiomaim/dashboards/crm/crm.component';
import { CRMService } from 'app/modules/axiomaim/dashboards/crm/crm.service';

export default [
    {
        path: '',
        component: CRMComponent,
        resolve: {
            data: () => inject(CRMService).getData(),
        },
    },
] as Routes;
