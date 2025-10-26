import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-blank',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public data: object [] = [{
    Id: 2,
    EventName: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30),
    IsAllDay: false
  }];
  public selectedDate: Date = new Date(2018, 1, 15);
  public currentView: View = 'Month';
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'Id',
      subject: { name: 'EventName' },
      isAllDay: { name: 'IsAllDay' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    }
  };
  constructor() {}

  ngOnInit() {}
}
