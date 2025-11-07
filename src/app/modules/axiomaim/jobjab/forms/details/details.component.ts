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
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PhoneLabel } from 'app/core/models/phone-labels.model';
import { FormsListComponent } from '../list/list.component';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { EmailLabel } from 'app/core/models/email-labels.model';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { Tag } from 'app/core/services/data-services/tags/tags.model';
import { FormsV2Service } from '../forms-v2.service';
import { Form, FormModel } from '../forms.model';


interface PhonenumberType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'forms-details',
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
        MatChipsModule,
        MatSlideToggleModule,
        RouterLink,
        MatAutocompleteModule

    ],
})
export class FormsDetailsComponent implements OnInit, OnDestroy {
    public _alertMessagesService = inject(AlertMessagesService);
    public _formsV2Service = inject(FormsV2Service);
    public _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    public _axiomaimLoadingService = inject(AxiomaimLoadingService);

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    isLoading = signal<boolean>(false);

    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    form: Form;
    itemForm: UntypedFormGroup;
    forms: Form[];
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
        private _formsListComponent: FormsListComponent,
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
            const form = this._formsV2Service.form();
            const data = form || FormModel.emptyDto();
            this.form = data;
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
        this.forms = await this._formsV2Service.forms();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 
        this.itemForm.patchValue(this._formsV2Service.form());
        console.log('form data', this.itemForm.value);
        this._changeDetectorRef.markForCheck();
        // Open the drawer
        this._formsListComponent.matDrawer.open();

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
        return this._formsListComponent.matDrawer.close();
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
     * Update the form
     */
    updateItem(): void {        
        // Get the form object
        // this.form.firstName = this.itemForm.get('firstName').value;
        // this.form.lastName = this.itemForm.get('lastName').value;
        // this.form.address = this.itemForm.get('address').value;
        // this.form.phoneNumbers = this.itemForm.get('phoneNumbers').value;
        // Update the form on the server
        this._formsV2Service
            .updateItem(this.form)
            .then(() => {
                // Toggle the edit mode off 
                this.toggleEditMode(false);
            });
    }

    // /**
    //  * Delete the form
    //  */
    // deleteContact(): void {
    //     // Open the confirmation dialog
    //     const confirmation = this._axiomaimConfirmationService.open({
    //         title: 'Delete form',
    //         message:
    //             'Are you sure you want to delete this form? This action cannot be undone!',
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
    //             // Get the current form's id
    //             const id = this.form.id;

    //             // Get the next/previous form's id
    //             const currentContactIndex = this.forms.findIndex(
    //                 (item) => item.id === id
    //             );
    //             const nextContactIndex =
    //                 currentContactIndex +
    //                 (currentContactIndex === this.forms.length - 1 ? -1 : 1);
    //             const nextContactId =
    //                 this.forms.length === 1 && this.forms[0].id === id
    //                     ? null
    //                     : this.forms[nextContactIndex].id;

    //             // Delete the form
    //             this._formsV2Service
    //                 .deleteItem(id)
    //                 .then((isDeleted) => {
    //                     // Return if the form wasn't deleted...
    //                     if (!isDeleted) {
    //                         return;
    //                     }

    //                     // Navigate to the next form if available
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
        // this._formsV2Service.uploadAvatar(event.target.files[0], 'forms').subscribe({
        //     next: (response: any) => {
        //         this._axiomaimLoadingService.hide();
        //         console.log('uploadAvatar', response)
        //         this.form.avatarPath = response.filePath;
        //         this.form.avatarFile = response.fileName;
        //         this.form.avatarType = response.fileType;
        //         this.form.avatarUrl = response.fileUrl;
        //         this.form.avatar = response.fileUrl;                
        //         this._form.next(this.form);
        //         console.log('form', this.form);
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
        // console.log('onOptionSelected', this.form);
        // this.form$.subscribe((resContact: Contact) => {

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
    //     const isTagApplied = this.form.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the form...
    //     if (isTagApplied) {
    //         // Remove the tag from the form
    //         this.removeTagFromContact(tag);
    //     } else {
    //         // Otherwise add the tag to the form
    //         this.addTagToContact(tag);
    //     }
    // }


        /**
     * Update form data without recreating the form
     */
    updateFormData(data: Form): void {
        // Patch simple values
        this.itemForm.patchValue({
            // firstName: data.firstName || '',
            // lastName: data.lastName || '',
            // address: data.address || '',
            // emails: data.emails || null,
            // phoneNumbers: data.phoneNumbers || null,
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
