import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    Renderer2,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
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
import { Country, Request, RequestModel } from '../requests.model';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { RequestsV2Service } from '../requests-v2.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PhoneLabel } from 'app/core/models/phone-labels.model';
import { RequestsListComponent } from '../list/list.component';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { EmailLabel } from 'app/core/models/email-labels.model';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { Tag } from 'app/core/services/data-services/tags/tags.model';


interface PhonenumberType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'requests-details',
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
        // SelectMultiComponent,
        MatChipsModule,
        // AlertMessagesComponent,
        MatSlideToggleModule,
        AddressLookupComponent,
        RouterLink,
        NgClass,
        MatAutocompleteModule

    ],
})
export class RequestsDetailsComponent implements OnInit, OnDestroy {
    public _alertMessagesService = inject(AlertMessagesService);
    public _requestsV2Service = inject(RequestsV2Service);
    public _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    public _axiomaimLoadingService = inject(AxiomaimLoadingService);

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(
        []
    );
    get countries$(): Observable<Country[]> {
        return this._countries.asObservable();
    }
    isLoading = signal<boolean>(false);

    countries: Country[];


    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    request: Request;
    itemForm: UntypedFormGroup;
    requests: Request[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    emailLabels: EmailLabel[] = [];
    phoneLabels: PhoneLabel[] = [];
    public address = new FormControl('');  // Standalone, but tied via formControlName in HTML

    loginUser: User;
    showRole: string[] = ["admin"];

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    currentContactRole = new FormControl('');
    readonly announcer = inject(LiveAnnouncer);


    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _requestsListComponent: RequestsListComponent,
        private _formBuilder: UntypedFormBuilder,
        private _axiomaimConfirmationService: AxiomaimConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        
    ) {

        // Create the basic form structure early
        this.itemForm = this._formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            company: ['', [Validators.required]],
            source: [null, [Validators.required]],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
            address: [''],  // Added for address-lookup integration
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const request = this._requestsV2Service.request();
            const data = request || RequestModel.emptyDto();
            this.request = data;
            this.updateFormData(data);
            this._changeDetectorRef.markForCheck();
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {

        this.loginUser = await this._firebaseAuthV2Service.loginUser();
        this.requests = await this._requestsV2Service.requests();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 
        this.itemForm.patchValue(this._requestsV2Service.request());
        console.log('form data', this.itemForm.value);
        this._changeDetectorRef.markForCheck();
        // Open the drawer
        this._requestsListComponent.matDrawer.open();

        this._changeDetectorRef.markForCheck();

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
        return this._requestsListComponent.matDrawer.close();
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
     * Update the request
     */
    updateItem(): void {        
        // Get the request object
        this.request.firstName = this.itemForm.get('firstName').value;
        this.request.lastName = this.itemForm.get('lastName').value;
        this.request.address = this.itemForm.get('address').value;
        this.request.phoneNumbers = this.itemForm.get('phoneNumbers').value;
        // Update the request on the server
        this._requestsV2Service
            .updateItem(this.request)
            .then(() => {
                // Toggle the edit mode off 
                this.toggleEditMode(false);
            });
    }

    // /**
    //  * Delete the request
    //  */
    // deleteContact(): void {
    //     // Open the confirmation dialog
    //     const confirmation = this._axiomaimConfirmationService.open({
    //         title: 'Delete request',
    //         message:
    //             'Are you sure you want to delete this request? This action cannot be undone!',
    //         actions: {
    //             confirm: {
    //                 label: 'Delete',
    //             },
    //         },
    //     });

    //     // Subscribe to the confirmation dialog closed action
    //     confirmation.afterClosed().subscribe((result) => {
    //         // If the confirm button pressed...
    //         if (result === 'confirmed') {
    //             // Get the current request's id
    //             const id = this.request.id;

    //             // Get the next/previous request's id
    //             const currentContactIndex = this.requests.findIndex(
    //                 (item) => item.id === id
    //             );
    //             const nextContactIndex =
    //                 currentContactIndex +
    //                 (currentContactIndex === this.requests.length - 1 ? -1 : 1);
    //             const nextContactId =
    //                 this.requests.length === 1 && this.requests[0].id === id
    //                     ? null
    //                     : this.requests[nextContactIndex].id;

    //             // Delete the request
    //             this._requestsV2Service
    //                 .deleteItem(id)
    //                 .then((isDeleted) => {
    //                     // Return if the request wasn't deleted...
    //                     if (!isDeleted) {
    //                         return;
    //                     }

    //                     // Navigate to the next request if available
    //                     if (nextContactId) {
    //                         this._router.navigate(['../', nextContactId], {
    //                             relativeTo: this._activatedRoute,
    //                         });
    //                     }
    //                     // Otherwise, navigate to the parent
    //                     else {
    //                         this._router.navigate(['../'], {
    //                             relativeTo: this._activatedRoute,
    //                         });
    //                     }

    //                     // Toggle the edit mode off
    //                     this.toggleEditMode(false);
    //                 });

    //             // Mark for check
    //             this._changeDetectorRef.markForCheck();
    //         }
    //     });
    // }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(event: any): void {
        console.log('event', event.target.files[0])
        this._axiomaimLoadingService.show()        
        // this._requestsV2Service.uploadAvatar(event.target.files[0], 'requests').subscribe({
        //     next: (response: any) => {
        //         this._axiomaimLoadingService.hide();
        //         console.log('uploadAvatar', response)
        //         this.request.avatarPath = response.filePath;
        //         this.request.avatarFile = response.fileName;
        //         this.request.avatarType = response.fileType;
        //         this.request.avatarUrl = response.fileUrl;
        //         this.request.avatar = response.fileUrl;                
        //         this._request.next(this.request);
        //         console.log('request', this.request);
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
        const avatarFormControl = this.itemForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

    }

    onOptionSelected(data: any[]) {
        console.log('onOptionSelected', data);
        // console.log('onOptionSelected', this.request);
        // this.request$.subscribe((resContact: Contact) => {

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
    //     const isTagApplied = this.request.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the request...
    //     if (isTagApplied) {
    //         // Remove the tag from the request
    //         this.removeTagFromContact(tag);
    //     } else {
    //         // Otherwise add the tag to the request
    //         this.addTagToContact(tag);
    //     }
    // }


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

        /**
     * Update form data without recreating the form
     */
    updateFormData(data: Request): void {
        // Patch simple values
        this.itemForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address: data.address || '',
            emails: data.emails || null,
            phoneNumbers: data.phoneNumbers || null,
        });

        // Update phone numbers array
        const phoneNumbersArray = this.itemForm.get('phoneNumbers') as UntypedFormArray;
        phoneNumbersArray.clear();
        const phoneNumbersFormGroups = data.phoneNumbers && data.phoneNumbers.length > 0 
            ? data.phoneNumbers.map((phoneNumber) => this._formBuilder.group({ 
                country: [phoneNumber.country || 'us'], 
                phoneNumber: [phoneNumber.phoneNumber || ''], 
                label: [phoneNumber.label || ''] 
            }))
            : [this._formBuilder.group({ country: ['us'], phoneNumber: [''], label: [''] })];

        phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
            phoneNumbersArray.push(phoneNumbersFormGroup);
        });
    }

    /**
     * Capture Address
     *
     * @param event
     */
    onAddressSelected(event: any) {
        const place = event.value;
        this.itemForm.patchValue({
            address: place.formatted_address || ''
        });
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
