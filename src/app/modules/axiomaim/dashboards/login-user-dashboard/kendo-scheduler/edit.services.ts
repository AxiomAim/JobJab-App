import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, zip } from "rxjs";
import { map, tap } from "rxjs/operators";

import {
  BaseEditService,
  SchedulerModelFields,
} from "@progress/kendo-angular-scheduler";
import { parseDate } from "@progress/kendo-angular-intl";
// import { UserAppointment } from "app/core/services/data-services/user-appointments/user-appointment.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { MyEventsDataService } from "app/core/services/data-services/my-events/my-events-data.service";
import { MyEvent } from "app/core/services/data-services/my-events/my-events.model";

const CREATE_ACTION = "Create";
const UPDATE_ACTION = "Update";
const REMOVE_ACTION = "Destroy";

const fields: SchedulerModelFields = {
  id: "id",
  title: "title",
  description: "description",
  startTimezone: "startTimezone",
  start: "start",
  end: "end",
  endTimezone: "endTimezone",
  isAllDay: "isAllDay",
  recurrenceRule: "recurrenceRule",
  recurrenceId: "recurrenceID",
  recurrenceExceptions: "recurrenceException",
};

@Injectable()
export class EditService extends BaseEditService<MyEvent> {
  _myEventsDataService = inject(MyEventsDataService);
  loginUser = inject(FirebaseAuthV2Service).loginUser();
  public loading = false;

  constructor(private http: HttpClient) {
    super(fields);
  }

  public read(): void {
    if (this.data.length) {
      this.source.next(this.data);
      return;
    }

    this.fetch().subscribe((data) => {
      this.data = data.map((item) => this.readEvent(item));
      this.source.next(this.data);
    });
  }

  protected save(
    created: MyEvent[],
    updated: MyEvent[],
    deleted: MyEvent[]
  ): void {
    const completed = [];
    if (deleted.length) {
      completed.push(this.fetch(REMOVE_ACTION, deleted));
    }

    if (updated.length) {
      completed.push(this.fetch(UPDATE_ACTION, updated));
    }

    if (created.length) {
      completed.push(this.fetch(CREATE_ACTION, created));
    }

    zip(...completed).subscribe(() => this.read());
  }

  protected fetch(action = "", data?: any): Observable<any[]> {
    this.loading = true;

    // console.log('action:', action);
    // console.log('data:', data);

    return this._myEventsDataService.getQuery('userId', '==', this.loginUser.id)  
      .pipe(
        map((res) => <any[]>res),
        tap(() => (this.loading = false))
      );

    // return this.http
    //   .post(
    //     `https://demos.telerik.com/service/v2/core/Tasks/${action}`,
    //     this.serializeModels(data),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //   .pipe(
    //     map((res) => <any[]>res),
    //     tap(() => (this.loading = false))
    //   );
  }

  private readEvent(item: any): MyEvent {
    return {
      ...item,
      start: parseDate(item.start),
      end: parseDate(item.end),
      recurrenceException: this.parseExceptions(item.recurrenceException),
    };
  }

  private serializeModels(events: any[]): string {
    if (!events) {
      return "";
    }

    const data = events.map((event) => ({
      ...event,
      recurrenceException: this.serializeExceptions(event.recurrenceExceptions),
    }));

    return JSON.stringify(data);
  }
}

// interface MyEvent {
//   id?: string;
//   orgId?: string;
//   userId?: string;
//   title?: string;
//   description?: string;
//   start?: Date;
//   end?: Date;
//   startTimezone?: string;
//   endTimezone?: string;
//   isAllDay?: boolean;
//   recurrenceException?: any;
//   recurrenceID?: number;
//   recurrenceRule?: string;
// }

// interface MyEvent {
//   TaskID?: number;
//   OwnerID?: number;
//   Title?: string;
//   Description?: string;
//   Start?: Date;
//   End?: Date;
//   StartTimezone?: string;
//   EndTimezone?: string;
//   IsAllDay?: boolean;
//   RecurrenceException?: any;
//   RecurrenceID?: number;
//   RecurrenceRule?: string;
// }
