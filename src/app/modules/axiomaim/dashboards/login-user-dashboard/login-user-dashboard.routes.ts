import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginUserDashboardV2Service } from './login-user-dashboardV2.service';
import { LoginUserDashboardComponent } from './login-user-dashboard.component';

export default [
    {
        path: '',
        component: LoginUserDashboardComponent,
        resolve: {
            totalLeads: () => inject(LoginUserDashboardV2Service).getTotalLeads(),
        },
    },
] as Routes;
