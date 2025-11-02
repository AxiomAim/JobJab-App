// formly-creator.component.ts
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { FormlyForm, FormlyFormOptions, FormlyFieldConfig, FormlyField } from '@ngx-formly/core';  // FIX: Added FormlyField import
import { Subject, takeUntil } from 'rxjs';
import { FormlySidebarComponent } from './formly-sidebar.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

interface FieldData {
    key: string;
    type: string;
    props: FieldProps;
}

interface FieldProps {
    label: string;
    placeholder: string;
    description: string;
    required: boolean;
    options?: Array<{ value: any; label: string }>;
}
@Component({
    selector: 'formly-creator',
    styleUrls: ['./formly-creator.component.scss'],
    templateUrl: './formly-creator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FormlyForm,
        FormlyField,  // FIX: Added to imports for <formly-field> directive
        MatSidenavModule,
        FormlySidebarComponent,
        MatButtonModule,
        MatIconModule,
        DragDropModule,
        MatDialogModule,
    ],
})
export class FormlyCreatorComponent implements OnInit, OnDestroy {
    form = new UntypedFormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [];  // Start empty; add dynamically

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    readonly dialog = inject(MatDialog);

    /**
     * Constructor
     */
    constructor(
        private _axiomaimMediaWatcherService: AxiomaimMediaWatcherService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media changes
        this._axiomaimMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Add a new field based on type (triggered by sidebar)
     */
    addField(formData: { key: string; type: string }): void {
        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: '800px',
            data: { key: formData.key, type: formData.type },  // Pass to dialog for pre-config
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.props) {  // Assume dialog returns { props: any }
                const config = this.createDefaultField({ key: formData.key, type: formData.type }, result.props);
                console.log('config', config)
                this.fields.push(config);
            }
        });
    }

    /**
     * Create default field config for type, merged with custom props
     */
    private createDefaultField(
        fieldData: { key: string; type: string },
        customProps: any = {}
    ): FormlyFieldConfig {
        const baseProps: FieldProps = {
            label: fieldData.key,  // Use display key for label (e.g., 'Select Multiple')
            placeholder: 'Placeholder',
            description: 'Description',
            required: false,
            ...customProps,  // Merge custom (overrides)
        };

        let config: FormlyFieldConfig = {
            key: `${fieldData.type.replace(/-/g, '_')}_${Date.now()}`,  // Unique key (e.g., 'select_multi_173XXXX')
            type: fieldData.type,
            props: baseProps,
        };

        // FIX: Apply general required validation based on props.required
        config.validation = baseProps.required ? { required: true } : null;

        // Handle special cases
        switch (fieldData.type) {
            case 'checkbox':
                // No special props needed; validation handles required
                break;
            case 'radio':
            case 'select':
                // FIX: Use dialog options or fallback to defaults if empty
                if (!baseProps.options || baseProps.options.length === 0) {
                    baseProps.options = [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                    ];
                }
                break;
            case 'select-multi':
                config.type = 'select';
                config.props.multiple = true;
                config.props.selectAllOption = 'Select All';
                // FIX: Use dialog options or fallback to defaults if empty
                if (!baseProps.options || baseProps.options.length === 0) {
                    baseProps.options = [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                    ];
                }
                break;
            // Add more cases as needed
            default:
                break;
        }

        return config;
    }

    drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
        moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    }
}