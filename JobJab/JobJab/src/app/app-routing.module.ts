import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./app-shell/schedule/schedule.module').then(module => module.SyncScheduleModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./app-shell/chart/chart.module').then(module => module.SyncChartModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./app-shell/grid/grid.module').then(module => module.SyncGridModule)
  },
  {
    path: '',
    loadChildren: () => import('./app-shell/grid/grid.module').then(module => module.SyncGridModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

