import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgTemplateOutlet, PercentPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { Shortcut } from 'app/layout/common/shortcuts/shortcuts.types';
import { Subject, takeUntil } from 'rxjs';
import { StagesListAddStageComponent } from './add-stage/add-stage.component';
import { Stage, StageModel } from 'app/core/services/data-services/stages/stages.model';
import { StagesV2Service } from 'app/core/services/data-services/stages/stages-v2.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; // New import
import { DragDropModule } from '@angular/cdk/drag-drop'; // New import

@Component({
    selector: 'stages-list',
    templateUrl: './stages-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'shortcuts',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgClass,
        NgTemplateOutlet,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        StagesListAddStageComponent,
        PercentPipe,
        DragDropModule
    ],
})
export class StagesListComponent implements OnInit, OnDestroy {
    public _stagesV2Service = inject(StagesV2Service);
    @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
    @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

    mode: 'view' | 'modify' | 'add' | 'edit' = 'view';
    stageForm: UntypedFormGroup;
    stages: Stage[];
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    editingId: string | null = null; // New: Track edit mode
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _shortcutsService: ShortcutsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Initialize the form
        this.stageForm = this._formBuilder.group({
            name: ['', Validators.required],
            percent: ['', Validators.required],
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the shortcuts panel
     */
    openPanel(): void {
        // Return if the shortcuts panel or its origin is not defined
        if (!this._shortcutsPanel || !this._shortcutsOrigin) {
            return;
        }

        // Make sure to start in 'view' mode
        this.mode = 'view';

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(
            new TemplatePortal(this._shortcutsPanel, this._viewContainerRef)
        );
    }

    /**
     * Close the shortcuts panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Change the mode
     */
    changeMode(mode: 'view' | 'modify' | 'add' | 'edit'): void {
        // Change the mode
        this.mode = mode;
    }

    /**
     * Prepare for a new shortcut
     */
    newStage(): void {
        // Reset the form
        this.stageForm.reset();

        // Enter the add mode
        this.mode = 'add';
    }

    /**
     * Edit a shortcut
     */
    editShortcut(shortcut: Shortcut): void {
        // Reset the form with the shortcut
        this.stageForm.reset(shortcut);

        // Enter the edit mode
        this.mode = 'edit';
    }

    /**
     * Save shortcut
     */
    async save() {
        const stage: Stage = StageModel.emptyDto();
        stage.name = this.stageForm.get('name').value;
        stage.percent = (this.stageForm.get('percent').value)/100;
        console.log('stage', stage);

        // If there is an id, update it...
        // if (stage.id) {
        //     this._shortcutsService.update(shortcut.id, shortcut).subscribe();
        // }
        // // Otherwise, create a new shortcut...
        // else {
            await this._stagesV2Service.createItem(stage);
        // }

        // Go back the modify mode
        this.mode = 'modify';
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'axiomaim-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._shortcutsOrigin._elementRef.nativeElement
                )
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    // New: Handle drop event
    drop(event: CdkDragDrop<Stage[]>): void {
        const currentStages = [...(this._stagesV2Service.stages() || [])];
        moveItemInArray(currentStages, event.previousIndex, event.currentIndex);

        // Optional: Reassign percent for persistence (evenly spaced 0-1)
        // Comment out if percent isn't for ordering
        const total = currentStages.length - 1;
        const updates: Partial<Stage>[] = currentStages.map((stage, index) => ({
            id: stage.id,
            percent: total > 0 ? (index / total) : 0 // e.g., [0, 0.5, 1] for 3 stages
        }));

        // Reorder in-memory
        this._stagesV2Service.reorder(currentStages);

        // Persist (optional; uncomment to save to Firestore)
        // this._stagesV2Service.bulkUpdate(updates).then(() => {
        //     console.log('Stages reordered and persisted');
        // });
    }

    // New: Edit a stage
    editStage(stage: Stage): void {
        this.editingId = stage.id;
        this.stageForm.patchValue({
            name: stage.name,
            percent: stage.percent * 100 // Display as 0-100 in input
        });
        this.mode = 'edit';
        this._changeDetectorRef.markForCheck(); // For OnPush
    }

    // Updated: Delete (only in edit mode)
    async delete(): Promise<void> {
        if (this.editingId) {
            await this._stagesV2Service.deleteItem(this.editingId);
            this.editingId = null;
            this.stageForm.reset();
            this.mode = 'modify';
            await this._stagesV2Service.getAll(); // Reload
            this._changeDetectorRef.markForCheck();
        }
    }    
}
