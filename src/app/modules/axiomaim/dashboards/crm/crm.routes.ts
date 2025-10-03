import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CRMComponent } from 'app/modules/axiomaim/dashboards/crm/crm.component';
import { CRMV2Service } from 'app/modules/axiomaim/dashboards/crm/crmV2.service';

export default [
    {
        path: '',
        component: CRMComponent,
        resolve: {
            totalLeads: () => inject(CRMV2Service).getTotalLeads(),
        },
    },
] as Routes;
