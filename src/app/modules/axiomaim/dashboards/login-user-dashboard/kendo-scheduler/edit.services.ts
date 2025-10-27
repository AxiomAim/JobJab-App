import { inject, Injectable } from "@angular/core";
import { Observable, zip, forkJoin, from } from "rxjs";
// import { map, tap, switchMap, catchError, filter } from "rxjs/operators";
import { catchError, map, tap } from "rxjs/operators";
import {
  BaseEditService,
  SchedulerModelFields,
} from "@progress/kendo-angular-scheduler";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { MyEvent, MyEventModel } from "app/core/services/data-services/my-events/my-events.model";
import { MyEventsV2Service } from "app/core/services/data-services/my-events/my-events-v2.service";

const CREATE_ACTION = "Create";
const UPDATE_ACTION = "Update";
const REMOVE_ACTION = "Destroy";

const fields: SchedulerModelFields = {
  id: "id",
  title: "Title",
  description: "Description",
  startTimezone: "StartTimezone",
  start: "Start",
  end: "End",
  endTimezone: "EndTimezone",
  isAllDay: "IsAllDay",
  recurrenceRule: "RecurrenceRule",
  recurrenceId: "RecurrenceID",
  recurrenceExceptions: "RecurrenceException",
};

@Injectable()
export class EditService extends BaseEditService<MyEvent> {
  _myEventsV2Service = inject(MyEventsV2Service);
  private _authService = inject(FirebaseAuthV2Service);
  private loginUser = this._authService.loginUser(); // Assuming sync; if async, handle accordingly
  public loading = false;

  constructor(
    // private http: HttpClient
  ) {
    super(fields);
  }  

  
public read(): void {
  // debugger
  if (this.data.length > 0) {
    this.source.next([...this.data]); // Clone to avoid ref issues
    return;
  }

  this.fetch().subscribe((data: MyEvent[]) => {
    const processedData = data
      .map((item) => {
        const response = this.readEvent(item);
        console.log('this.fetch():response', response);
        return response;
      })
      .filter((item): item is MyEvent => item !== null); // Type guard ensures valid MyEvent[]
    // console.log('processedData', processedData);
    this.data = processedData;
    console.log('this.data', this.data);
    // this.source.next([...processedData]); // Clone the array

    this.source.next([...processedData]); // Emit cloned valid array
  });
}

  protected async save(
    created: MyEvent[],
    updated: MyEvent[],
    deleted: MyEvent[]
  ) {
    const completed = [];

    if (deleted.length) {
      const deleteObservables = deleted.map(async (item) => 
        await this._myEventsV2Service.deleteItem(item.id).then((res) => {
          completed.push(this.fetch(REMOVE_ACTION, deleted));
          return res;
        }));
    }

    if (updated.length) {
      completed.push(
        from(Promise.all(updated.map(async (event: any) => {
          const appointment: MyEvent = {
            id: event.id as string,
            orgId: this.loginUser.organization.id,
            userId: this.loginUser.id,
            Title: event.Title || '',
            Description: event.Description || '',
            Start: event.start!,
            End: event.end!,
            StartTimezone: event.StartTimezone || '',
            EndTimezone: event.EndTimezone || '',
            IsAllDay: event.IsAllDay || false,
            RecurrenceRule: event.RecurrenceRule || null,
            RecurrenceID: typeof event.RecurrenceID === 'number' ? event.RecurrenceID : null,
            RecurrenceException: this.serializeExceptions(event.RecurrenceException),
          };
          await this._myEventsV2Service.updateItem(appointment).then((res) => {
            console.log('updateItem:res', res);
            completed.push(this.fetch(UPDATE_ACTION, updated));
          });
        })))
      );
    }

    if (created.length) {
      completed.push(
        from(Promise.all(created.map(async (event: MyEvent) => {
          console.log('created:event', event);
          const base = MyEventModel.emptyDto();
          // delete base.id; // Remove generated UUID to let Firestore auto-generate
          const appointment: MyEvent = {
            ...base,
            orgId: this.loginUser.organization.id,
            userId: this.loginUser.id,
            Title: event.Title || '',
            Description: event.Description || '',
            Start: event.Start!,
            End: event.End!,
            StartTimezone: event.StartTimezone || '',
            EndTimezone: event.EndTimezone || '',
            IsAllDay: event.IsAllDay || false,
            RecurrenceRule: event.RecurrenceRule || null,
            RecurrenceID: typeof event.RecurrenceID === 'number' ? event.RecurrenceID : null,
            RecurrenceException: this.serializeExceptions(event.RecurrenceException),
          };
          await this._myEventsV2Service.createItem(appointment).then((res) => {  
            console.log('Created appointment:', res);
            completed.push(this.fetch(CREATE_ACTION, created));
           });
        })))
      );
    }

    // if (completed.length > 0) {
      zip(...completed).subscribe(() => this.read());
    // }
  }

  protected fetch(action = "", data?: any): Observable<MyEvent[]> {
    this.loading = true;

    return from(this._myEventsV2Service.getAllUserAppomitments()).pipe(
      map((appointments: any[]) => {
        // Filter to current user's appointments
        const userAppointments = appointments.filter(a => a.userId === this.loginUser.id);
        return userAppointments;
      }),
      tap(() => (this.loading = false)),
      catchError((error) => {
        console.error('Error fetching appointments:', error);
        this.loading = false;
        throw error;
      })
    );
  }

  // private readEvent(item: MyEvent): MyEvent | null {
  //   // Parse dates; parseDate(null/undefined) returns null
  //   const start = parseDate(item.Start);
  //   const end = parseDate(item.End);

  //   // Filter out invalid events (null/undefined start or end causes ZonedDate.fromLocalDate crash)
  //   if (!start || !end) {
  //     console.warn(`Skipping invalid event (null start/end): ${item.id || 'unknown'}`, item);
  //     return null;
  //   }

  //   return {
  //     ...item,
  //     Start: start,
  //     End: end,
  //     RecurrenceException: this.parseExceptions(item.RecurrenceException),
  //   };
  // }

private isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

  private readEvent(item: any): MyEvent | null {
    // Ensure start and end are valid Dates
    let start = item.Start;
    let end = item.End;

    if (!(start instanceof Date) || isNaN(start.getTime())) {
      console.warn(`Invalid start date for appointment ${item.id}:`, item.Start);
      start = new Date(); // or skip: return null;
    } else {
      start = new Date(start);
    }

    if (!(end instanceof Date) || isNaN(end.getTime())) {
      console.warn(`Invalid end date for appointment ${item.id}:`, item.End);
      end = new Date(start.getTime() + 3600000); // 1 hour later
    } else {
      end = new Date(end);
    }

    if (start >= end) {
      console.warn(`Invalid date range for appointment ${item.id}`);
      return null;
    }

    return {
      ...item,
      Start: start,
      End: end,
      recurrenceExceptions: this.parseExceptions(item.recurrenceExceptions),
    };
  }


// private readEvent(item: MyEvent): MyEvent | null {
//   console.log('readEvent', item);
//   // Parse dates safely – handle strings, timestamps, or nulls
//   let start: Date | null = null;
//   let end: Date | null = null;

//   if (item.Start) {
//     start = typeof item.Start === 'string' ? new Date(item.Start) : (item.Start as Date);
//     if (!this.isValidDate(start)) start = null;
//   }

//   if (item.End) {
//     end = typeof item.End === 'string' ? new Date(item.End) : (item.End as Date);
//     if (!this.isValidDate(end)) end = null;
//   }

//   // Skip if either date is invalid (prevents crash)
//   if (!start || !end) {
//     console.warn(`Skipping invalid event ID: ${item.id || 'unknown'} – Invalid start/end dates`, item);
//     return null;
//   }

//     return {
//       ...item,
//       Start: start,
//       End: end,
//       RecurrenceException: this.parseExceptions(item.RecurrenceException),
//     };
// }
  private serializeModels(events: any[]): string {
    if (!events) {
      return "";
    }

    const data = events.map((event) => ({
      ...event,
      RecurrenceException: this.serializeExceptions(event.RecurrenceExceptions),
    }));

    return JSON.stringify(data);
  }
}