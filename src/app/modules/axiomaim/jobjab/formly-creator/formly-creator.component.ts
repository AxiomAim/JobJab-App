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
import { FormlyForm, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject, takeUntil } from 'rxjs';
import { FormlySidebarComponent } from './formly-sidebar.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'formly-creator',
    styleUrls: ['./formly-creator.component.scss'],
    templateUrl: './formly-creator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FormlyForm,
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
        const baseProps = {
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

        // Handle special cases
        switch (fieldData.type) {
            case 'checkbox':
                // Use validation for required checkbox (better than pattern for boolean)
                config.validation = {
                    required: true,
                    messages: { required: 'Please accept the terms' },
                };
                break;
            case 'radio':
            case 'select':
                config.props.options = [
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                ];
                break;
            case 'select-multi':
                config.type = 'select';
                config.props.multiple = true;
                config.props.selectAllOption = 'Select All';
                config.props.options = [
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                    { value: 3, label: 'Option 3' },
                ];
                break;
            case 'autocomplete':
                // Assuming Formly supports 'autocomplete' type; if not, change to 'input' with props.autocomplete
                config.props.options = [
                    { value: 1, label: 'Option 1' },
                    { value: 2, label: 'Option 2' },
                ];
                break;
            case 'slider':
                // Add defaults for slider
                config.props.min = 0;
                config.props.max = 100;
                config.props.thumbLabel = true;
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