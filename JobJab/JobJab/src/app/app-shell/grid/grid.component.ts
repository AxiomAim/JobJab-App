import { Component, OnInit } from '@angular/core';
import { data } from './datasource';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-blank',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  constructor() {}
  public data!: Object[];
  public pageSettings!: PageSettingsModel;

  ngOnInit() {
    this.data = data;
    this.pageSettings = { pageSize: 6 };
  }
}
