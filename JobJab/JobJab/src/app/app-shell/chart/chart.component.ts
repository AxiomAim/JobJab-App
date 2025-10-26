import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-blank',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  primaryYAxis!: object;
  constructor() {}
  public primaryXAxis!: object;
  public chartData!: object[];
  public legendSettings!: object;
  public title!: string;
  public tooltip!: object;
  public marker!: object;
  public load(args: ILoadedEventArgs): void {
    args.chart.theme = (('fluent2'.charAt(0).toUpperCase() + 'fluent2'.slice(1)).replace(/-dark/i, 'Dark') as ChartTheme);
  }
  ngOnInit() {
    // Title for chart
    this.title = 'Sales Analysis';
    // Legend for chart
    this.legendSettings = {
      visible: true
  };
    this.tooltip = {
  enable: true
};
    this.marker = {
  dataLabel: {
      visible: true
  }
};
    // Data for chart series
    this.chartData = [
      { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
      { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];
    this.primaryXAxis = {
      valueType: 'Category'
  };
    this.primaryYAxis = {
    labelFormat: '${value}K'
};
  }
}
