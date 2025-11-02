import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'dialog-form',
    templateUrl: './dialog-form.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
})
export class DialogFormComponent implements OnInit {
    readonly data = inject(MAT_DIALOG_DATA);  // { key: string; type: string }
    readonly dialogRef = inject(MatDialogRef<DialogFormComponent>);
    form: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form with defaults from data
        this.form = this._formBuilder.group({
            label: [this.data.key, [Validators.required]],
            placeholder: [''],
            description: [''],
            required: [false],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Cancel
     */
    cancel(): void {
        this.dialogRef.close();
    }

    /**
     * onSubmit
     */
    onSubmit(): void {
        if (this.form.valid) {
            this.dialogRef.close({ props: this.form.value });
        }
    }
}