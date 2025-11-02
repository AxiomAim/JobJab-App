// formly-creator.routes.ts
import { Routes } from '@angular/router';
import { FormlyCreatorComponent } from './formly-creator.component';

export default [
    {
        path: '',
        component: FormlyCreatorComponent,
        resolve: {
            // activities: () => inject(ActivitiesService).getActivities(),
        },
    },
] as Routes;