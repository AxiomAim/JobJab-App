import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, zip, forkJoin } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";

import {
  BaseEditService,
  SchedulerModelFields,
} from "@progress/kendo-angular-scheduler";
import { parseDate } from "@progress/kendo-angular-intl";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { MyEventsDataService } from "app/core/services/data-services/my-events/my-events-data.service";
import { MyEvent } from "app/core/services/data-services/my-events/my-events.model";

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
  _myEventsDataService = inject(MyEventsDataService);
  private _authService = inject(FirebaseAuthV2Service);
  private loginUser = this._authService.loginUser(); // Assuming sync; if async, handle accordingly
  public loading = false;

  constructor(private http: HttpClient) {
    super(fields);
  }

  public read(): void {
    if (this.data.length) {
      // Shallow clone to prevent reference issues during re-emits (avoids Kendo internal null refs)
      this.source.next([...this.data]);
      return;
    }

    this.fetch().subscribe((data) => {
      // Process and filter valid events only
      const validData = data
        .map((item) => this.readEvent(item))
        .filter((event): event is MyEvent => event !== null); // Type guard to ensure non-null

      this.data = validData;
      // Shallow clone for emission
      this.source.next([...this.data]);
    });
  }

  protected save(
    created: MyEvent[],
    updated: MyEvent[],
    deleted: MyEvent[]
  ): void {
    const completed = [];

    if (deleted.length) {
      const deleteObservables = deleted.map((item) => 
        this._myEventsDataService.deleteItem(item.id)
      );
      completed.push(forkJoin(deleteObservables));
    }

    if (updated.length) {
      const updateObservables = updated.map((item) => 
        this._myEventsDataService.updateItem(item)
      );
      completed.push(forkJoin(updateObservables));
    }

    if (created.length) {
      const createObservables = created.map((item) => {
        item.orgId = this.loginUser.organization?.id || null;
        item.userId = this.loginUser.id;
        return this._myEventsDataService.createItem(item);
      });
      completed.push(forkJoin(createObservables));
    }

    if (completed.length > 0) {
      zip(...completed).subscribe(() => this.read());
    }
  }

  protected fetch(action = "", data?: any): Observable<MyEvent[]> {
    this.loading = true;

    return this._myEventsDataService.getQuery('userId', '==', this.loginUser.id)
      .pipe(
        map((res) => res as MyEvent[]),
        tap(() => (this.loading = false))
      );
  }

  private readEvent(item: MyEvent): MyEvent | null {
    // Parse dates; parseDate(null/undefined) returns null
    const start = parseDate(item.Start);
    const end = parseDate(item.End);

    // Filter out invalid events (null/undefined start or end causes ZonedDate.fromLocalDate crash)
    if (!start || !end) {
      console.warn(`Skipping invalid event (null start/end): ${item.id || 'unknown'}`, item);
      return null;
    }

    return {
      ...item,
      Start: start,
      End: end,
      RecurrenceException: this.parseExceptions(item.RecurrenceException),
    };
  }

  // private serializeModels(events: MyEvent[]): string {
  //   if (!events) {
  //     return "";
  //   }

  //   const data = events.map((event) => ({
  //     ...event,
  //     RecurrenceException: this.serializeExceptions(event.RecurrenceExceptions),
  //   }));

  //   return JSON.stringify(data);
  // }
}