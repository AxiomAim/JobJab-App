import { CurrencyPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { ProjectService } from 'app/modules/axiomaim/dashboards/project/project.service';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule'
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars'
import { DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService, 
    AgendaService, 
    MonthAgendaService,  
    TimelineViewsService, 
    TimelineMonthService, 
    EventSettingsModel, 
    GroupModel} from '@syncfusion/ej2-angular-schedule'
import { Subject } from 'rxjs';
import { resourceData } from './datasource';

@Component({
    selector: 'project-schedule',
    templateUrl: './project-schedule.component.html',
    styleUrls: ['./project-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ScheduleModule,
        TimePickerModule
    ],
    providers: [
        DayService,
        WeekService,
        WorkWeekService,
        MonthService,
        AgendaService,
        MonthAgendaService,
        TimelineViewsService,
        TimelineMonthService,
    ]
})
export class ProjectScheduleComponent implements OnInit, OnDestroy {
    public selectedDate: Date = new Date(2018, 3, 1);
    public views: Array<string> = ['Week', 'Month', 'TimelineWeek', 'TimelineMonth'];
    public eventSettings: EventSettingsModel = {
        dataSource: resourceData
    };
    public group: GroupModel = {
        resources: ['Owners']
    };
    public allowMultipleRoom: Boolean = true;
    public roomDataSource: Object[] = [
        { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
        { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
        { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
    ];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router
    ) {

        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
