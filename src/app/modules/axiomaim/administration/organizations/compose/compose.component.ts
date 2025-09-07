import { Component, ElementRef, inject, OnInit, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Country, Organization, OrganizationModel } from '../organizations.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationsV2Service } from '../organizationsV2.service';
import { Tag } from 'app/core/models/tag.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, finalize, Observable, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TemplatePortal } from '@angular/cdk/portal';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DavesaFindByKeyPipe } from '@davesa/pipes/find-by-key';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { DavesaLoadingService } from '@davesa/services/loading';
import { DavesaLoadingBarComponent } from '@davesa/components/loading-bar';
import { Router } from '@angular/router';
import { SelectAutocompleteComponent } from 'app/layout/common/select-autocomplete/select-autocomplete.component';

@Component({
    selector: 'organizations-compose',
    templateUrl: './compose.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatDatepickerModule,
        NgIf,
        MatRippleModule,
        MatCheckboxModule,
        NgClass,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        SettingsComponent,
        DavesaLoadingBarComponent,
        AsyncPipe,
    ],
})
export class OrganizationsComposeComponent implements OnInit {
    _router = inject(Router);
    _davesaLoadingService = inject(DavesaLoadingService);
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    _organizationsV2Service = inject(OrganizationsV2Service);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    organization: Organization = OrganizationModel.emptyDto();
    private _organization: BehaviorSubject<Organization | null> = new BehaviorSubject(
        null
    );
    get organization$(): Observable<Organization> {
        return this._organization.asObservable();
    }

    composeForm: UntypedFormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc: false,
        bcc: false,
    };
    countdown: number = 5;
    fileFormat: "image/png, image/jpeg";

    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    countries: Country[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    showRole: string[] = ["admin"];



    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<OrganizationsComposeComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _overlay: Overlay,
        private _renderer2: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _davesaConfirmationService: DavesaConfirmationService

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._organization.next(this.organization);
        this.countries = this._organizationsV2Service.countries();
        // Create the form
        const domainControl = new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-z]{2,}$/),
        ]);
        
        // Create the form
        this.composeForm = this._formBuilder.group({
            id: [''],
            domain: domainControl,
            avatar: [null],
            company: ['', [Validators.required]],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            address: [null],
            notes: [null],
            tags: [[]],
        });

        // Clear the emails and phoneNumbers form arrays
        (this.composeForm.get('emails') as UntypedFormArray).clear();
        (
        this.composeForm.get('phoneNumbers') as UntypedFormArray
        ).clear();

        // Patch values to the form
        this.composeForm.patchValue(this.organization);

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
            (this.composeForm.get('emails') as UntypedFormArray).push(
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
                this.composeForm.get('phoneNumbers') as UntypedFormArray
            ).push(phoneNumbersFormGroup);
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): void {
        console.log('composeForm', this.composeForm.valid)
        if (this.composeForm.valid) {
            const updateOrg = { ...this.organization, ...this.composeForm.value }
            this.organization = updateOrg;
            const domain = this.composeForm.controls.domain.value;
            this.organization.id = this.organization.domain;
    
            if(!this.checkDomain(domain)) {
                this.createItem();
            } else {

            // Open the confirmation dialog
            const confirmation = this._davesaConfirmationService.open({
                title: 'Domain Exists',
                message:
                    `${domain} already exists.`,
                actions: {
                    confirm: {
                        label: 'Close',
                    },
                },
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe((result) => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Get the product object
                }
            });

            }
            return;
        }
    }
    
    createItem(): void {
        this._organizationsV2Service.createItem(this.organization).subscribe((res) => {
            this.organization = res;
            this._router.navigate(['apps/organizations']);
            this.matDialogRef.close(this.organization);
        });
    }


    close() {
        this.matDialogRef.close();
    }
    /**
     * Show the copy field with the given field name
     *
     * @param name
     */
    showCopyField(name: string): void {
        // Return if the name is not one of the available names
        if (name !== 'cc' && name !== 'bcc') {
            return;
        }

        // Show the field
        this.copyFields[name] = true;
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {}

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {}

    /**
     * Send the message
     */
    send(): void {}


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
        const avatarFormControl = this.composeForm.get('avatar');

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
    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no tag available...
        if (this.filteredTags.length === 0) {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.organization.tags.find((id) => id === tag.id);

        // If the found tag is already applied to the organization...
        if (isTagApplied) {
            // Remove the tag from the organization
            this.removeTagFromContact(tag);
        } else {
            // Otherwise add the tag to the organization
            this.addTagToContact(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void {
        const tag = {
            title,
        };

        // Create tag on the server
        // this._organizationsV2Service.createTag(tag).subscribe((response) => {
        //     // Add the tag to the organization
        //     this.addTagToContact(response);
        // });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: Tag, event): void {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        // this._organizationsV2Service
        //     .updateTag(tag.id, tag)
        //     .pipe(debounceTime(300))
        //     .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

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
    addTagToContact(tag: Tag): void {
        // Add the tag
        this.organization.tags.unshift(tag.id);

        // Update the organization form
        this.composeForm.get('tags').patchValue(this.organization.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the organization
     *
     * @param tag
     */
    removeTagFromContact(tag: Tag): void {
        // Remove the tag
        this.organization.tags.splice(
            this.organization.tags.findIndex((item) => item === tag.id),
            1
        );

        // Update the organization form
        this.composeForm.get('tags').patchValue(this.organization.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle organization tag
     *
     * @param tag
     */
    toggleContactTag(tag: Tag): void {
        if (this.organization.tags.includes(tag.id)) {
            this.removeTagFromContact(tag);
        } else {
            this.addTagToContact(tag);
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
        (this.composeForm.get('emails') as UntypedFormArray).push(
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
        const emailsFormArray = this.composeForm.get(
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
        (this.composeForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.composeForm.get(
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
        if(iso) {
            return this.countries.find((country) => country.iso === iso);

        }
    }


    checkDomain(domain: string): boolean {
        let isValid = false;
        this._firebaseAuthV2Service.checkDomain(domain).subscribe((res) => {
            if(res) {
                isValid = true;
            } else {
                isValid = false;
            }
        });
        return isValid;
    }


    setScheme(event:any) {
    
    }
    
    setTheme(event:any) {
    
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
