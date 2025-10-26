import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { LineSeriesService, DataLabelService} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ChartModule
  ],
  providers: [ CategoryService, LineSeriesService, LegendService, TooltipService, DataLabelService]
})
export class SyncChartModule { }
