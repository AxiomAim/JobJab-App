import { NgClass } from '@angular/common';
import { Component, ViewEncapsulation, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimConfirmationConfig as AxiomaimTouchConfig } from '@axiomaim/services/confirmation/confirmation.types';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Action {
  name: string;
  done: boolean;
}

@Component({
    selector: 'axiomaim-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .axiomaim-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {
                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule, 
        MatDialogModule, 
        MatIconModule, 
        NgClass,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatChipsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
})
export class AxiomaimTouchDialogComponent {
readonly date = new FormControl(moment);
    data: AxiomaimTouchConfig = inject(MAT_DIALOG_DATA);
    touchForm: UntypedFormGroup;

    types = new FormControl('');
    typeList: string[] = ['Phone', 'Text', 'In Person'];

    readonly addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    readonly actions = signal<Action[]>([]);
    readonly announcer = inject(LiveAnnouncer);


    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
    ) {

        // Create the form
        this.touchForm = this._formBuilder.group({
            date: [moment],
            type: [''],
            notes: [''],
            actions: ['']
        });
    }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.actions.update(actions => [...actions, {name: value, done: false}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(action: Action): void {
    this.actions.update(actions => {
      const index = actions.indexOf(action);
      if (index < 0) {
        return actions;
      }

      actions.splice(index, 1);
      this.announcer.announce(`Removed ${action.name}`);
      return [...actions];
    });
  }

    edit(action: Action, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove action if it no longer has a name
    if (!value) {
      this.remove(action);
      return;
    }

    // Edit existing action
    this.actions.update(actions => {
      const index = actions.indexOf(action);
      if (index >= 0) {
        actions[index].name = value;
        return [...actions];
      }
      return actions;
    });
  }

}
