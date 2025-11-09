import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginUserDashboardV2Service } from './login-user-dashboardV2.service';
import { LoginUserDashboardComponent } from './login-user-dashboard.component';

export default [
    {
        path: '',
        component: LoginUserDashboardComponent,
        resolve: {
            queries: () => inject(LoginUserDashboardV2Service).getQueries(),
            quotes: () => inject(LoginUserDashboardV2Service).getQuotes(),
            jobs: () => inject(LoginUserDashboardV2Service).getJobs(),
            invoices: () => inject(LoginUserDashboardV2Service).getInvoices(),
        },
    },
] as Routes;
