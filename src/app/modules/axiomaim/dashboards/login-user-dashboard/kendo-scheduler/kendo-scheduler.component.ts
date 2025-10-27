// kendo-scheduler.component.ts (Fixed and Optimized)
import { Component, inject, OnInit } from "@angular/core";
import {
  KENDO_SCHEDULER,
  Group,
  Resource,
  SlotClassArgs,
  CreateFormGroupArgs,
  CancelEvent,
  CrudOperation,
  EditMode,
  EventClickEvent,
  RemoveEvent,
  SaveEvent,
  SchedulerComponent,
  SlotClickEvent,
} from "@progress/kendo-angular-scheduler";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  AbstractControl,
  FormControl,
} from "@angular/forms";
import { UserAppointmentsV2Service } from "app/core/services/data-services/user-appointments/user-appointments-v2.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { filter } from "rxjs";
import { EditService } from "./edit.services";
import { AsyncPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { v4 as uuidv4 } from 'uuid';
import { MyEvent, MyEventModel } from "app/core/services/data-services/my-events/my-events.model"; // Added import

@Component({
  selector: 'app-kendo-scheduler',
  templateUrl: './kendo-scheduler.component.html',
  styleUrls: ['./kendo-scheduler.component.scss'],
  standalone: true,
  imports: [
    KENDO_SCHEDULER, 
    ReactiveFormsModule,
    AsyncPipe,
    // MatButtonModule,
    // MatIconModule,
    // MatTooltipModule
  ],
  providers: [EditService],
})
export class KendoSchedulerComponent implements OnInit {
  loginUser = inject(FirebaseAuthV2Service).loginUser();
  _userAppointmentsV2Service = inject(UserAppointmentsV2Service);
  
  public selectedDate: Date = new Date(); // Changed to current date for relevance
  public startTime: string = "08:00";
  public endTime: string = "18:00";
  public formGroup!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public editService: EditService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  async createSampleEvent() {
    const newEvent: MyEvent = MyEventModel.emptyDto(); // Fixed: Use MyEventModel
    newEvent.id = uuidv4().toString();
    newEvent.Start = new Date();
    newEvent.End = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour later
    newEvent.IsAllDay = false;
    newEvent.Title = 'Event One'; // Lowercase to match fields
    newEvent.Description = 'Testing event.';
    newEvent.userId = this.loginUser.id;
    newEvent.orgId = this.loginUser.organization.id;    
    this.editService.create(newEvent);
  }

  ngOnInit(): void {
    this.editService.read();
  }

  // Removed unused loadUserAppointments() and createItem()

  public slotDblClickHandler({
    sender,
    start,
    end,
    isAllDay,
  }: SlotClickEvent): void {
    console.log("Slot Double Clicked:", start, end, isAllDay);
    this.closeEditor(sender);

    this.formGroup = this.formBuilder.group({
      Start: [start, Validators.required],
      End: [end, Validators.required],
      StartTimezone: new FormControl(),
      EndTimezone: new FormControl(),
      IsAllDay: isAllDay,
      Title: new FormControl(""),
      Description: new FormControl(""),
      RecurrenceRule: new FormControl(),
      RecurrenceID: new FormControl(),
    });

    sender.addEvent(this.formGroup);
  }

  public eventDblClickHandler({ sender, event }: EventClickEvent): void {
    console.log("Event Double Clicked:", event);
    this.closeEditor(sender);

    let dataItem = event.dataItem;
    if (this.editService.isRecurring(dataItem)) {
      sender
        .openRecurringConfirmationDialog(CrudOperation.Edit)
        .pipe(filter((editMode) => editMode !== undefined))
        .subscribe((editMode: EditMode) => {
          if (editMode === EditMode.Series) {
            dataItem = this.editService.findRecurrenceMaster(dataItem);
          }
          this.formGroup = this.createFormGroup(dataItem, editMode);
          sender.editEvent(dataItem, { group: this.formGroup, mode: editMode });
        });
    } else {
      this.formGroup = this.createFormGroup(dataItem, EditMode.Event);
      sender.editEvent(dataItem, { group: this.formGroup });
    }
  }

  public createFormGroup(dataItem: any, mode: EditMode): FormGroup { // Fixed: Lowercase fields
    const isOccurrence = mode === EditMode.Occurrence;
    const exceptions = isOccurrence ? [] : dataItem.recurrenceException;

    return this.formBuilder.group({
      Start: [dataItem.Start, Validators.required],
      End: [dataItem.End, Validators.required],
      StartTimezone: [dataItem.StartTimezone],
      EndTimezone: [dataItem.EndTimezone],
      IsAllDay: dataItem.IsAllDay,
      Title: dataItem.Title,
      Description: dataItem.Description,
      RecurrenceRule: dataItem.RecurrenceRule,
      RecurrenceID: dataItem.RecurrenceID,
      RecurrenceException: [exceptions],
    });
  }

  public cancelHandler({ sender }: CancelEvent): void {
    console.log("Edit Cancelled");
    this.closeEditor(sender);
  }

  public removeHandler({ sender, dataItem }: RemoveEvent): void {
    console.log("Remove Handler Invoked for:", dataItem);
    if (this.editService.isRecurring(dataItem)) {
      sender
        .openRecurringConfirmationDialog(CrudOperation.Remove)
        .pipe(filter((editMode) => editMode !== undefined))
        .subscribe((editMode) => {
          this.handleRemove(dataItem, editMode);
        });
    } else {
      sender.openRemoveConfirmationDialog().subscribe((shouldRemove) => {
        if (shouldRemove) {
          this.editService.remove(dataItem);
        }
      });
    }
  }

  public saveHandler({
    sender,
    formGroup,
    isNew,
    dataItem,
    mode,
  }: SaveEvent): void {
    console.log("Save Handler Invoked");
    if (formGroup.valid) {
      const formValue = formGroup.value; // Now lowercase keys

      if (isNew) {
        // Ensure orgId and userId for new events (handled in EditService.save)
        this.editService.create(formValue);
      } else {
        this.handleUpdate(dataItem, formValue, mode);
      }

      this.closeEditor(sender);
    }
  }

  public dragEndHandler({ sender, event, start, end, isAllDay }): void {
    console.log("Drag Ended:", start, end, isAllDay);
    let value = { start, end, isAllDay }; // Lowercase
    let dataItem = event.dataItem;

    if (this.editService.isRecurring(dataItem)) {
      sender
        .openRecurringConfirmationDialog(CrudOperation.Edit)
        .pipe(filter((editMode) => editMode !== undefined))
        .subscribe((editMode: EditMode) => {
          if (editMode === EditMode.Series) {
            dataItem = this.editService.findRecurrenceMaster(dataItem);
            value.start = this.seriesDate(
              dataItem.Start,
              event.dataItem.Start,
              start
            );
            value.end = this.seriesDate(dataItem.End, event.dataItem.End, end);
          } else {
            value = { ...dataItem, ...value };
          }

          this.handleUpdate(dataItem, value, editMode);
        });
    } else {
      this.handleUpdate(dataItem, value);
    }
  }

  public resizeEndHandler({ sender, event, start, end }): void {
    console.log("Resize Ended:", start, end);
    let value = { start, end }; // Lowercase
    let dataItem = event.dataItem;

    if (this.editService.isRecurring(dataItem)) {
      sender
        .openRecurringConfirmationDialog(CrudOperation.Edit)
        .pipe(filter((editMode) => editMode !== undefined))
        .subscribe((editMode: EditMode) => {
          if (editMode === EditMode.Series) {
            dataItem = this.editService.findRecurrenceMaster(dataItem);
            value.start = this.seriesDate(
              dataItem.Start,
              event.dataItem.Start,
              start
            );
            value.end = this.seriesDate(dataItem.End, event.dataItem.End, end);
          } else {
            value = { ...dataItem, ...value };
          }

          this.handleUpdate(dataItem, value, editMode);
        });
    } else {
      this.handleUpdate(dataItem, value);
    }
  }

  private closeEditor(scheduler: SchedulerComponent): void {
    console.log("Closing Editor");
    scheduler.closeEvent();

    this.formGroup = undefined;
  }

  private handleUpdate(item: any, value: any, mode?: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.update(item, value);
      } else {
        service.createException(item, value);
      }
    } else {
      service.update(item, value);
    }
  }

  private handleRemove(item: any, mode: EditMode): void {
    console.log("Handle Remove Invoked for:", item, "in mode:", mode);
    const service = this.editService;
    if (mode === EditMode.Series) {
      service.removeSeries(item);
    } else if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.remove(item);
      } else {
        service.removeOccurrence(item);
      }
    } else {
      service.remove(item);
    }
  }

  private seriesDate(head: Date, occurence: Date, current: Date): Date { // Fixed: lowercase
    console.log("Calculating series date for head:", head, "occurrence:", occurence, "current:", current);
    const year =
      occurence.getFullYear() === current.getFullYear()
        ? head.getFullYear()
        : current.getFullYear();
    const month =
      occurence.getMonth() === current.getMonth()
        ? head.getMonth()
        : current.getMonth();
    const date =
      occurence.getDate() === current.getDate()
        ? head.getDate()
        : current.getDate();
    const hours =
      occurence.getHours() === current.getHours()
        ? head.getHours()
        : current.getHours();
    const minutes =
      occurence.getMinutes() === current.getMinutes()
        ? head.getMinutes()
        : current.getMinutes();

    return new Date(year, month, date, hours, minutes);
  }
}