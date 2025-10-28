import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimConfirmationService } from '@axiomaim/services/confirmation';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { ProjectTeam } from '../project-teams.model';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { SelectMultiComponent } from 'app/layout/common/select-multi/select-multi.component';
import { ProjectTeamsV2Service } from '../project-teams-v2.service';
import { ProjectTeamsListComponent } from '../list/list.component';
import { Tag } from 'app/core/services/data-services/tags/tags.model';


interface PhonenumberType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'project-teams-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatTooltipModule,
        RouterLink,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        TextFieldModule,
        SelectMultiComponent,
    ],
})
export class ProjectTeamsDetailsComponent implements OnInit, OnDestroy {
    _projectTeamsV2Service = inject(ProjectTeamsV2Service);
    _axiomaimLoadingService = inject(AxiomaimLoadingService);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    private _projectTeam: BehaviorSubject<ProjectTeam | null> = new BehaviorSubject(
        null
    );
    get projectTeam$(): Observable<ProjectTeam> {
        return this._projectTeam.asObservable();
    }


    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    projectTeam: ProjectTeam;
    projectTeamForm: UntypedFormGroup;
    projectTeams: ProjectTeam[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    loginProduct: ProjectTeam;
    showRole: string[] = ["admin"];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _projectTeamsListComponent: ProjectTeamsListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _axiomaimConfirmationService: AxiomaimConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
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
        // this.organization = this._projectTeamsV2Service.organization();
        this.projectTeams = this._projectTeamsV2Service.projectTeams();
        this.projectTeam = this._projectTeamsV2Service.projectTeam();
        // this.projectTeamRoles = this._projectTeamsV2Service.projectTeamRoles();
        // Open the drawer
        this._projectTeamsListComponent.matDrawer.open();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 

        // Create the projectTeam form
        this.projectTeamForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phoneNumbers: this._formBuilder.array([]),
            address: [null],
            activeProduct:  [true, [Validators.required]],
        });

        this._changeDetectorRef.markForCheck();

        this._projectTeamsListComponent.matDrawer.open();
        this.projectTeamForm.patchValue(this.projectTeam);
        // this._countries.next(this._projectTeamsV2Service.countries());

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._projectTeamsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the projectTeam
     */
    updateItem(): void {        
        this.projectTeam = {...this._projectTeam.getValue(), ...this.projectTeamForm.getRawValue()};
        console.log('projectTeam', this.projectTeam);
        // Get the projectTeam object
        // const projectTeam = this.projectTeamForm.getRawValue();

        // Update the projectTeam on the server
        this._projectTeamsV2Service
            .updateItem(this.projectTeam)
            .then(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the projectTeam
     */
    deleteProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimConfirmationService.open({
            title: 'Delete projectTeam',
            message:
                'Are you sure you want to delete this projectTeam? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current projectTeam's id
                const id = this.projectTeam.id;

                // Get the next/previous projectTeam's id
                const currentProductIndex = this.projectTeams.findIndex(
                    (item) => item.id === id
                );
                const nextProductIndex =
                    currentProductIndex +
                    (currentProductIndex === this.projectTeams.length - 1 ? -1 : 1);
                const nextProductId =
                    this.projectTeams.length === 1 && this.projectTeams[0].id === id
                        ? null
                        : this.projectTeams[nextProductIndex].id;

                // Delete the projectTeam
                this._projectTeamsV2Service
                    .deleteItem(id)
                    .then((isDeleted) => {
                        // Return if the projectTeam wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next projectTeam if available
                        if (nextProductId) {
                            this._router.navigate(['../', nextProductId], {
                                relativeTo: this._activatedRoute,
                            });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], {
                                relativeTo: this._activatedRoute,
                            });
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(event: any): void {
        console.log('event', event.target.files[0])
        this._axiomaimLoadingService.show()        
        // this._projectTeamsV2Service.uploadAvatar(event.target.files[0], 'projectTeams').subscribe({
        //     next: (response: any) => {
        //         this._axiomaimLoadingService.hide();
        //         console.log('uploadAvatar', response)
        //         this.projectTeam.avatarPath = response.filePath;
        //         this.projectTeam.avatarFile = response.fileName;
        //         this.projectTeam.avatarType = response.fileType;
        //         this.projectTeam.avatarUrl = response.fileUrl;
        //         this.projectTeam.avatar = response.fileUrl;                
        //         this._projectTeam.next(this.projectTeam);
        //         console.log('projectTeam', this.projectTeam);
        //     },
        //     error: (error: any) => {
        //         this._axiomaimLoadingService.hide();
        //         console.error('error', error);
        //     },
        // });
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.projectTeamForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the projectTeam
        // this.projectTeam.avatar = null;
    }

    onOptionSelected(data: any[]) {
        console.log('onOptionSelected', data);
        // this.projectTeam.projectTeamRoles = data;
        this._projectTeam.next(this.projectTeam);
        // console.log('onOptionSelected', this.projectTeam);
        // this.projectTeam$.subscribe((resProduct: Product) => {

        // });
    }
    /**
     * Open tags panel
     */
    openTagsPanel(): void {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass: '',
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(64)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                ]),
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {
            // Add a class to the origin
            this._renderer2.addClass(
                this._tagsPanelOrigin.nativeElement,
                'panel-opened'
            );

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement
                .querySelector('input')
                .focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(
            this._tagsPanel,
            this._viewContainerRef
        );

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {
            // Remove the class from the origin
            this._renderer2.removeClass(
                this._tagsPanelOrigin.nativeElement,
                'panel-opened'
            );

            // If overlay exists and attached...
            if (
                this._tagsPanelOverlayRef &&
                this._tagsPanelOverlayRef.hasAttached()
            ) {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if (templatePortal && templatePortal.isAttached) {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
    }


    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter((tag) =>
            tag.title.toLowerCase().includes(value)
        );
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    // filterTagsInputKeyDown(event): void {
    //     // Return if the pressed key is not 'Enter'
    //     if (event.key !== 'Enter') {
    //         return;
    //     }

    //     // If there is no tag available...
    //     if (this.filteredTags.length === 0) {
    //         // Create the tag
    //         this.createTag(event.target.value);

    //         // Clear the input
    //         event.target.value = '';

    //         // Return
    //         return;
    //     }

    //     // If there is a tag...
    //     const tag = this.filteredTags[0];
    //     const isTagApplied = this.projectTeam.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the projectTeam...
    //     if (isTagApplied) {
    //         // Remove the tag from the projectTeam
    //         this.removeTagFromProduct(tag);
    //     } else {
    //         // Otherwise add the tag to the projectTeam
    //         this.addTagToProduct(tag);
    //     }
    // }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
