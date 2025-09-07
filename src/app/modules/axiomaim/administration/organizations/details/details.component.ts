import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
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
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key/find-by-key.pipe';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { Tag } from 'app/core/models/tag.model';
import { OrganizationsListComponent } from 'app/modules/davesa/administration/organizations/list/list.component';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { Country, Organization } from '../organizations.model';
import { OrganizationsV2Service } from '../organizationsV2.service';
import { DavesaLoadingService } from '@davesa/services/loading';

@Component({
    selector: 'organizations-details',
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
        NgClass,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        TextFieldModule,
        AsyncPipe
        // DavesaFindByKeyPipe,
        // DatePipe,
    ],
})
export class OrganizationsDetailsComponent implements OnInit, OnDestroy {
    _organizationsV2Service = inject(OrganizationsV2Service);
    _davesaLoadingService = inject(DavesaLoadingService);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    private _organization: BehaviorSubject<Organization | null> = new BehaviorSubject(
        null
    );
    get organization$(): Observable<Organization> {
        return this._organization.asObservable();
    }

    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    organization: Organization;
    organizationForm: UntypedFormGroup;
    organizations: Organization[];
    countries: Country[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    showRole: string[] = ["admin"];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _organizationsListComponent: OrganizationsListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _davesaConfirmationService: DavesaConfirmationService,
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
        // Open the drawer
        this._organizationsListComponent.matDrawer.open();

        // Create the organization form
        this.organizationForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            name: ['', [Validators.required]],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            title: [''],
            company: [''],
            birthday: [null],
            address: [null],
            notes: [null],
            tags: [[]],
        });

        // Get the organizations
        this.organizations = this._organizationsV2Service.organizations();
            // .pipe(takeUntil(this._unsubscribeAll))
            // .subscribe((organizations: Organization[]) => {
                // this.organizations = organizations;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        // Get the organization
        this.organization = this._organizationsV2Service.organization()
        this._organization.next(this.organization);
            // .pipe(takeUntil(this._unsubscribeAll))
            // .subscribe((organization: Organization) => {
                // Open the drawer in case it is closed
                this._organizationsListComponent.matDrawer.open();

                // Get the organization
                // this.organization = organization;

                // Clear the emails and phoneNumbers form arrays
                (this.organizationForm.get('emails') as UntypedFormArray).clear();
                (
                    this.organizationForm.get('phoneNumbers') as UntypedFormArray
                ).clear();

                // Patch values to the form
                this.organizationForm.patchValue(this.organization);

                // Setup the emails form array
                const emailFormGroups = [];

                if (this.organization.emails.length > 0) {
                    // Iterate through them
                    this.organization.emails.forEach((email) => {
                        // Create an email form group
                        emailFormGroups.push(
                            this._formBuilder.group({
                                email: [email.email],
                                label: [email.label],
                            })
                        );
                    });
                } else {
                    // Create an email form group
                    emailFormGroups.push(
                        this._formBuilder.group({
                            email: [''],
                            label: [''],
                        })
                    );
                }

                // Add the email form groups to the emails form array
                emailFormGroups.forEach((emailFormGroup) => {
                    (this.organizationForm.get('emails') as UntypedFormArray).push(
                        emailFormGroup
                    );
                });

                // Setup the phone numbers form array
                const phoneNumbersFormGroups = [];

                if (this.organization.phoneNumbers.length > 0) {
                    // Iterate through them
                    this.organization.phoneNumbers.forEach((phoneNumber) => {
                        // Create an email form group
                        phoneNumbersFormGroups.push(
                            this._formBuilder.group({
                                country: [phoneNumber.country],
                                phoneNumber: [phoneNumber.phoneNumber],
                                label: [phoneNumber.label],
                            })
                        );
                    });
                } else {
                    // Create a phone number form group
                    phoneNumbersFormGroups.push(
                        this._formBuilder.group({
                            country: ['us'],
                            phoneNumber: [''],
                            label: [''],
                        })
                    );
                }

                // Add the phone numbers form groups to the phone numbers form array
                phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
                    (
                        this.organizationForm.get('phoneNumbers') as UntypedFormArray
                    ).push(phoneNumbersFormGroup);
                });

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        // Get the country telephone codes
        this.countries = this._organizationsV2Service.countries();
            // .pipe(takeUntil(this._unsubscribeAll))
            // .subscribe((codes: Country[]) => {
            //     this.countries = codes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        // Get the tags
        // this._organizationsV2Service.tags$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((tags: Tag[]) => {
        //         this.tags = tags;
        //         this.filteredTags = tags;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
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
        return this._organizationsListComponent.matDrawer.close();
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
     * Update the organization
     */
    updateItem(): void {
        
        this.organization = {...this._organization.getValue(), ...this.organizationForm.getRawValue()};
        console.log('organization', this.organization);
        // Get the organization object
        // const organization = this.organizationForm.getRawValue();

        // Go through the organization object and clear empty values
        this.organization .emails = this.organization .emails.filter((email) => email.email);

        this.organization .phoneNumbers = this.organization .phoneNumbers.filter(
            (phoneNumber) => phoneNumber.phoneNumber
        );

        // Update the organization on the server
        this._organizationsV2Service
            .updateItem(this.organization.id, this.organization)
            .subscribe(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the organization
     */
    deleteOrganization(): void {
        // Open the confirmation dialog
        const confirmation = this._davesaConfirmationService.open({
            title: 'Delete organization',
            message:
                'Are you sure you want to delete this organization? This action cannot be undone!',
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
                // Get the current organization's id
                const id = this.organization.id;

                // Get the next/previous organization's id
                const currentOrganizationIndex = this.organizations.findIndex(
                    (item) => item.id === id
                );
                const nextOrganizationIndex =
                    currentOrganizationIndex +
                    (currentOrganizationIndex === this.organizations.length - 1 ? -1 : 1);
                const nextOrganizationId =
                    this.organizations.length === 1 && this.organizations[0].id === id
                        ? null
                        : this.organizations[nextOrganizationIndex].id;

                // Delete the organization
                this._organizationsV2Service
                    .deleteItem(id)
                    .subscribe((isDeleted) => {
                        // Return if the organization wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next organization if available
                        if (nextOrganizationId) {
                            this._router.navigate(['../', nextOrganizationId], {
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
        this._davesaLoadingService.show()        
        this._organizationsV2Service.uploadAvatar(event.target.files[0], 'organizations').subscribe({
            next: (response: any) => {
                this._davesaLoadingService.hide();
                console.log('uploadAvatar', response)
                this.organization.avatarPath = response.filePath;
                this.organization.avatarFile = response.fileName;
                this.organization.avatarType = response.fileType;
                this.organization.avatarUrl = response.fileUrl;
                this.organization.avatar = response.fileUrl;                
                this._organization.next(this.organization);
                console.log('organization', this.organization);
            },
            error: (error: any) => {
                this._davesaLoadingService.hide();
                console.error('error', error);
            },
        });
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.organizationForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the organization
        this.organization.avatar = null;
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
    //     const isTagApplied = this.organization.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the organization...
    //     if (isTagApplied) {
    //         // Remove the tag from the organization
    //         this.removeTagFromOrganization(tag);
    //     } else {
    //         // Otherwise add the tag to the organization
    //         this.addTagToOrganization(tag);
    //     }
    // }

    /**
     * Create a new tag
     *
     * @param title
     */
    // createTag(title: string): void {
    //     const tag = {
    //         title,
    //     };

    //     // Create tag on the server
    //     this._organizationsV2Service.createTag(tag).subscribe((response) => {
    //         // Add the tag to the organization
    //         this.addTagToOrganization(response);
    //     });
    // }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    // updateTagTitle(tag: Tag, event): void {
    //     // Update the title on the tag
    //     tag.title = event.target.value;

    //     // Update the tag on the server
    //     this._organizationsV2Service
    //         .updateTag(tag.id, tag)
    //         .pipe(debounceTime(300))
    //         .subscribe();

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: Tag): void {
        // Delete the tag from the server
        this._organizationsV2Service.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the organization
     *
     * @param tag
     */
    addTagToOrganization(tag: Tag): void {
        // Add the tag
        this.organization.tags.unshift(tag.id);

        // Update the organization form
        this.organizationForm.get('tags').patchValue(this.organization.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the organization
     *
     * @param tag
     */
    removeTagFromOrganization(tag: Tag): void {
        // Remove the tag
        this.organization.tags.splice(
            this.organization.tags.findIndex((item) => item === tag.id),
            1
        );

        // Update the organization form
        this.organizationForm.get('tags').patchValue(this.organization.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle organization tag
     *
     * @param tag
     */
    toggleOrganizationTag(tag: Tag): void {
        if (this.organization.tags.includes(tag.id)) {
            this.removeTagFromOrganization(tag);
        } else {
            this.addTagToOrganization(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean {
        return !!!(
            inputValue === '' ||
            this.tags.findIndex(
                (tag) => tag.title.toLowerCase() === inputValue.toLowerCase()
            ) > -1
        );
    }

    /**
     * Add the email field
     */
    addEmailField(): void {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: [''],
        });

        // Add the email form group to the emails form array
        (this.organizationForm.get('emails') as UntypedFormArray).push(
            emailFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void {
        // Get form array for emails
        const emailsFormArray = this.organizationForm.get(
            'emails'
        ) as UntypedFormArray;

        // Remove the email field
        emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['us'],
            phoneNumber: [''],
            label: [''],
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.organizationForm.get('phoneNumbers') as UntypedFormArray).push(
            phoneNumberFormGroup
        );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.organizationForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country {
        return this.countries.find((country) => country.iso === iso);
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
}
