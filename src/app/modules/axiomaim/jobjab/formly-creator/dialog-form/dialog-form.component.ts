// dialog-form.component.ts
import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

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
            options: this._formBuilder.array([]),
        });

        // FIX: Removed erroneous 'contact.emails' block (undefined variable)
        // FIX: Conditionally initialize options FormArray with 3 defaults only for relevant types
        if (['select', 'radio', 'select-multi'].includes(this.data.type)) {
            const optionsArray = this.form.get('options') as UntypedFormArray;
            const defaultOptions = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
            ];
            defaultOptions.forEach((opt) => {
                optionsArray.push(
                    this._formBuilder.group({
                        value: [opt.value],
                        label: [opt.label],
                    })
                );
            });
        }
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

    /**
     * Get options controls for template
     */
    getOptions(): any[] {
        return (this.form.get('options') as UntypedFormArray).controls;
    }

    /**
     * Add an option
     * FIX: Renamed/updated from addEmailField; now for 'options'
     */
    addOption(): void {
        // Create an empty option form group
        const optionFormGroup = this._formBuilder.group({
            value: [''],
            label: [''],
        });

        // Add the option form group to the options form array
        (this.form.get('options') as UntypedFormArray).push(
            optionFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove an option
     * FIX: Renamed/updated from removeEmailField; now for 'options'
     * @param index
     */
    removeOption(index: number): void {
        // Get form array for options
        const optionsFormArray = this.form.get(
            'options'
        ) as UntypedFormArray;

        // Remove the option field
        optionsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

}