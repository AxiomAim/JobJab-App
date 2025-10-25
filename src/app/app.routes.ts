import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// prettier-ignore
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/crm'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/login-user-dashboard'},

    // Redirect signed-in user to the '/dashboards/crm'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch : 'full',
        redirectTo: 'dashboards/login-user-dashboard'
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth-firebase/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth-firebase/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth-firebase/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth-firebase/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth-firebase/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth-firebase/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth-firebase/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        // resolve: {
        //     initialData: initialDataResolver
        // },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
            {path: 'pricing', loadChildren: () => import('app/modules/landing/pricing/pricing.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'login-user-dashboard', loadChildren: () => import('app/modules/axiomaim/dashboards/login-user-dashboard/login-user-dashboard.routes')},
                {path: 'crm', loadChildren: () => import('app/modules/axiomaim/dashboards/crm/crm.routes')},
                {path: 'project', loadChildren: () => import('app/modules/axiomaim/dashboards/project/project.routes')},
                {path: 'analytics', loadChildren: () => import('app/modules/axiomaim/dashboards/analytics/analytics.routes')},
                {path: 'finance', loadChildren: () => import('app/modules/axiomaim/dashboards/finance/finance.routes')},
                {path: 'crypto', loadChildren: () => import('app/modules/axiomaim/dashboards/crypto/crypto.routes')},
            ]},

            // Forms
            {path: 'forms', children: [
                // Quote Form
                {path: 'quote', loadChildren: () => import('app/modules/axiomaim/forms/quote/quote.routes')},
                {path: 'quote-normal', loadChildren: () => import('app/modules/axiomaim/forms/quote-normal/quote-normal.routes')},
                {path: 'quote-scroll', loadChildren: () => import('app/modules/axiomaim/forms/quote-scroll/quote-scroll.routes')},
                {path: 'quote-content', loadChildren: () => import('app/modules/axiomaim/forms/quote-content/quote-content.routes')},
                // Instant Forms
                {path: 'instant-forms', loadChildren: () => import('app/modules/axiomaim/forms/instant-forms/instant-forms.routes')},
            ]},


            // Administration
            {path: 'administration', children: [
                {path: 'messages', loadChildren: () => import('app/modules/axiomaim/administration/messages/messages.routes')},
                {path: 'organizations', loadChildren: () => import('app/modules/axiomaim/administration/organizations/organizations.routes')},
                {path: 'users', loadChildren: () => import('app/modules/axiomaim/administration/users/users.routes')},
                {path: 'user-timesheets', loadChildren: () => import('app/modules/axiomaim/administration/user-timesheets/user-timesheets.routes')},
                {path: 'products', loadChildren: () => import('app/modules/axiomaim/administration/products/products.routes')},
                {path: 'jobs', loadChildren: () => import('app/modules/axiomaim/administration/jobs/jobs.routes')},
                {path: 'invoices', loadChildren: () => import('app/modules/axiomaim/administration/invoices/invoices.routes')},
                {path: 'technicians', loadChildren: () => import('app/modules/axiomaim/administration/technicians/technicians.routes')},
                {path: 'newsletters', loadChildren: () => import('app/modules/axiomaim/administration/newsletters/newsletters.routes')},
            ]},

            // CRM
            {path: 'crm', children: [
                {path: 'contacts', loadChildren: () => import('app/modules/axiomaim/crm/contacts/contacts.routes')},
                {path: 'sources', loadChildren: () => import('app/modules/axiomaim/crm/sources/sources.routes')},
            ]},

            // Projects
            {path: 'projects', children: [
                {path: 'items', loadChildren: () => import('app/modules/axiomaim/projects/items/items.routes')},
                {path: 'quotes', loadChildren: () => import('app/modules/axiomaim/projects/quotes/quotes.routes')},
                {path: 'quotes-requests', loadChildren: () => import('app/modules/axiomaim/projects/quotes-requests/quotes-requests.routes')},
                {path: 'project-teams', loadChildren: () => import('app/modules/axiomaim/projects/project-teams/project-teams.routes')},
                // {path: 'user-roles', loadChildren: () => import('app/modules/axiomaim/administration/user-roles/user-roles.routes')},
                // {path: 'organizations', loadChildren: () => import('app/modules/axiomaim/administration/organizations/organizations.routes')},
            ]},

            // Services
            {path: 'services', children: [
                {path: 'services', loadChildren: () => import('app/modules/axiomaim/services/services/services.routes')},
                {path: 'subscriptions', loadChildren: () => import('app/modules/axiomaim/services/subscriptions/subscriptions.routes')},
            ]},

            // Apps
            {path: 'apps', children: [
                {path: 'academy', loadChildren: () => import('app/modules/axiomaim/apps/academy/academy.routes')},
                {path: 'chat', loadChildren: () => import('app/modules/axiomaim/apps/chat/chat.routes')},
                {path: 'contacts', loadChildren: () => import('app/modules/axiomaim/apps/contacts/contacts.routes')},
                {path: 'ecommerce', loadChildren: () => import('app/modules/axiomaim/apps/ecommerce/ecommerce.routes')},
                {path: 'offers', loadChildren: () => import('app/modules/axiomaim/apps/offers/offers.routes')},
                {path: 'file-manager', loadChildren: () => import('app/modules/axiomaim/apps/file-manager/file-manager.routes')},
                {path: 'help-center', loadChildren: () => import('app/modules/axiomaim/apps/help-center/help-center.routes')},
                {path: 'mailbox', loadChildren: () => import('app/modules/axiomaim/apps/mailbox/mailbox.routes')},
                {path: 'notes', loadChildren: () => import('app/modules/axiomaim/apps/notes/notes.routes')},
                {path: 'scrumboard', loadChildren: () => import('app/modules/axiomaim/apps/scrumboard/scrumboard.routes')},
                // {path: 'tasks', loadChildren: () => import('app/modules/axiomaim/apps/tasks/tasks.routes')},
            ]},

            // Pages
            {path: 'pages', children: [

                // Activities
                {path: 'activities', loadChildren: () => import('app/modules/axiomaim/pages/activities/activities.routes')},

                // Authentication
                {path: 'authentication', loadChildren: () => import('app/modules/axiomaim/pages/authentication/authentication.routes')},

                // Coming Soon
                {path: 'coming-soon', loadChildren: () => import('app/modules/axiomaim/pages/coming-soon/coming-soon.routes')},

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/axiomaim/pages/error/error-404/error-404.routes')},
                    {path: '500', loadChildren: () => import('app/modules/axiomaim/pages/error/error-500/error-500.routes')}
                ]},

                // Invoice
                {path: 'invoice', children: [
                    {path: 'printable', children: [
                        {path: 'compact', loadChildren: () => import('app/modules/axiomaim/pages/invoice/printable/compact/compact.routes')},
                        {path: 'modern', loadChildren: () => import('app/modules/axiomaim/pages/invoice/printable/modern/modern.routes')}
                    ]}
                ]},

                // Maintenance
                {path: 'maintenance', loadChildren: () => import('app/modules/axiomaim/pages/maintenance/maintenance.routes')},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('app/modules/axiomaim/pages/pricing/modern/modern.routes')},
                    {path: 'simple', loadChildren: () => import('app/modules/axiomaim/pages/pricing/simple/simple.routes')},
                    {path: 'single', loadChildren: () => import('app/modules/axiomaim/pages/pricing/single/single.routes')},
                    {path: 'table', loadChildren: () => import('app/modules/axiomaim/pages/pricing/table/table.routes')}
                ]},

                // Profile
                {path: 'profile', loadChildren: () => import('app/modules/axiomaim/pages/profile/profile.routes')},

                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/axiomaim/pages/settings/settings.routes')},
            ]},

            // User Interface
            {path: 'ui', children: [

                // Material Components
                {path: 'material-components', loadChildren: () => import('app/modules/axiomaim/ui/material-components/material-components.routes')},

                // Axiomaim Components
                {path: 'axiomaim-components', loadChildren: () => import('app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.routes')},

                // Other Components
                {path: 'other-components', loadChildren: () => import('app/modules/axiomaim/ui/other-components/other-components.routes')},

                // TailwindCSS
                {path: 'tailwindcss', loadChildren: () => import('app/modules/axiomaim/ui/tailwindcss/tailwindcss.routes')},

                // Advanced Search
                {path: 'advanced-search', loadChildren: () => import('app/modules/axiomaim/ui/advanced-search/advanced-search.routes')},

                // Animations
                {path: 'animations', loadChildren: () => import('app/modules/axiomaim/ui/animations/animations.routes')},

                 // Cards
                {path: 'cards', loadChildren: () => import('app/modules/axiomaim/ui/cards/cards.routes')},

                // Colors
                {path: 'colors', loadChildren: () => import('app/modules/axiomaim/ui/colors/colors.routes')},

                // Confirmation Dialog
                {path: 'confirmation-dialog', loadChildren: () => import('app/modules/axiomaim/ui/confirmation-dialog/confirmation-dialog.routes')},

                // Datatable
                {path: 'datatable', loadChildren: () => import('app/modules/axiomaim/ui/datatable/datatable.routes')},

                // Forms
                {path: 'forms', loadChildren: () => import('app/modules/axiomaim/ui/forms/forms.routes')},

                // Icons
                {path: 'icons', loadChildren: () => import('app/modules/axiomaim/ui/icons/icons.routes')},

                // Page Layouts
                {path: 'page-layouts', loadChildren: () => import('app/modules/axiomaim/ui/page-layouts/page-layouts.routes')},

                // Typography
                {path: 'typography', loadChildren: () => import('app/modules/axiomaim/ui/typography/typography.routes')}
            ]},

            // Documentation
            {path: 'docs', children: [

                // Changelog
                {path: 'changelog', loadChildren: () => import('app/modules/axiomaim/docs/changelog/changelog.routes')},

                // Guides
                {path: 'guides', loadChildren: () => import('app/modules/axiomaim/docs/guides/guides.routes')}
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/axiomaim/pages/error/error-404/error-404.routes')},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
