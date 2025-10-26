import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { from, Observable, zip } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import {
  BaseEditService,
  SchedulerModelFields,
} from "@progress/kendo-angular-scheduler";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { UserAppointmentsV2Service } from "app/core/services/data-services/user-appointments/user-appointments-v2.service";
import { UserAppointment, UserAppointmentModel } from "app/core/services/data-services/user-appointments/user-appointment.model";

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
  recurrenceId: "recurrenceId",
  recurrenceExceptions: "recurrenceExceptions",
};

@Injectable()
export class EditService extends BaseEditService<UserAppointment> {
  loginUser = inject(FirebaseAuthV2Service).loginUser();
  _userAppointmentsV2Service = inject(UserAppointmentsV2Service);

  public loading = false;

  constructor(
    // private http: HttpClient
  ) {
    super(fields);
  }

  public read(): void {
    if (this.data.length) {
      this.source.next([...this.data]); // Clone to avoid reference issues
      return;
    }

    this.fetch().subscribe((data) => {
      const processedData = data
        .map((item) => this.readEvent(item))
        .filter((item): item is UserAppointment => item !== null);
      this.data = processedData;
      console.log('fetch:data', this.data);
      this.source.next([...this.data]); // Clone the array
    });
  }

  protected async save(
    created: any[],
    updated: any[],
    deleted: any[]
  ) {
    const completed = [];

    // Handle deletions
    if (deleted.length) {
      completed.push(
        from(Promise.all(deleted.map(async (event) => 
          await this._userAppointmentsV2Service.deleteItem(event.id as string)
        )))
      );
    }

    // Handle updates
    if (updated.length) {
      completed.push(
        from(Promise.all(updated.map(async (event) => {
          const appointment: UserAppointment = {
            id: event.id as string,
            orgId: this.loginUser.organization.id,
            userId: this.loginUser.id,
            title: event.title || '',
            description: event.description || '',
            start: event.Start!,
            end: event.End!,
            startTimezone: event.startTimezone || '',
            endTimezone: event.endTimezone || '',
            isAllDay: event.isAllDay || false,
            recurrenceRule: event.recurrenceRule || null,
            recurrenceId: event.recurrenceId || '',
            recurrenceExceptions: this.serializeExceptions(event.recurrenceExceptions),
          };
          await this._userAppointmentsV2Service.updateItem(appointment).then(async (res) => {
            await this._userAppointmentsV2Service.getAllUserAppomitments();
            return appointment;
          });
        })))
      );
    }

    // Handle creations
    if (created.length) {
      completed.push(
        from(Promise.all(created.map(async (event) => {
          const base = UserAppointmentModel.emptyDto();
          delete base.id; // Remove generated UUID to let Firestore auto-generate
          const appointment: UserAppointment = {
            ...base,
            orgId: this.loginUser.organization.id,
            userId: this.loginUser.id,
            title: event.title || '',
            description: event.description || '',
            start: event.start!,
            end: event.end!,
            startTimezone: event.startTimezone || '',
            endTimezone: event.endTimezone || '',
            isAllDay: event.isAllDay || false,
            recurrenceRule: event.recurrenceRule || null,
            recurrenceId: event.recurrenceId || '',
            recurrenceExceptions: this.serializeExceptions(event.recurrenceExceptions),
          };
          await this._userAppointmentsV2Service.createItem(appointment).then(async (res) => {  
            console.log('Created appointment:', res);
            await this._userAppointmentsV2Service.getAllUserAppomitments();
            return res;
           });
        })))
      );
    }

    if (completed.length) {
      zip(...completed).subscribe(() => this.read());
    }
  }

  protected fetch(action = "", data?: any): Observable<UserAppointment[]> {
    this.loading = true;

    return from(this._userAppointmentsV2Service.getAllUserAppomitments()).pipe(
      map((appointments: any[]) => {
        const res = this.serializeModels(appointments)
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

  private readEvent(item: any): UserAppointment | null {
    // Ensure start and end are valid Dates
    let start = item.start;
    let end = item.end;

    if (!(start instanceof Date) || isNaN(start.getTime())) {
      console.warn(`Invalid start date for appointment ${item.id}:`, item.start);
      start = new Date(); // or skip: return null;
    } else {
      start = new Date(start);
    }

    if (!(end instanceof Date) || isNaN(end.getTime())) {
      console.warn(`Invalid end date for appointment ${item.id}:`, item.end);
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
      start,
      end,
      recurrenceExceptions: this.parseExceptions(item.recurrenceExceptions),
    };
  }

  protected parseExceptions(exceptions?: string): Date[] {
    if (!exceptions) {
      return [];
    }
    try {
      const parsed = JSON.parse(exceptions);
      if (Array.isArray(parsed)) {
        return parsed
          .map((ex: string) => {
            const date = new Date(ex);
            return isNaN(date.getTime()) ? null : date;
          })
          .filter((d): d is Date => d !== null);
      }
    } catch {
      // Ignore parsing errors
    }
    return [];
  }

  protected serializeExceptions(exceptions?: Date[]): string {
    if (!exceptions || !Array.isArray(exceptions)) {
      return '';
    }
    const isos = exceptions
      .map((ex: Date) => ex.toISOString())
      .filter(Boolean);
    return JSON.stringify(isos);
  }

  private serializeModels(events: any[]): string {
    if (!events) {
      return "";
    }

    const data = events.map((event) => ({
      ...event,
      recurrenceExceptions: this.serializeExceptions(event.recurrenceExceptions),
    }));

    return JSON.stringify(data);
  }
}

// interface UserAppointmentModel extends Omit<UserAppointment, 'recurrenceExceptions'> {
//   recurrenceExceptions?: Date[];
// }