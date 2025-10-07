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
import { Tag } from 'app/core/models/tag.model';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { Customer } from '../customers.model';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { SelectMultiComponent } from 'app/layout/common/select-multi/select-multi.component';
import { CustomersV2Service } from '../customers-v2.service';
import { User } from 'app/core/user/user.types';
import { CustomersListComponent } from '../list/list.component';


interface PhonenumberType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'customers-details',
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
export class CustomersDetailsComponent implements OnInit, OnDestroy {
    _customersV2Service = inject(CustomersV2Service);
    _axiomaimLoadingService = inject(AxiomaimLoadingService);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    private _customer: BehaviorSubject<Customer | null> = new BehaviorSubject(
        null
    );
    get customer$(): Observable<Customer> {
        return this._customer.asObservable();
    }


    editMode: boolean = false;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    customer: Customer;
    customerForm: UntypedFormGroup;
    customers: Customer[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    loginUser: User;
    showRole: string[] = ["admin"];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _customersListComponent: CustomersListComponent,
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
        this.customers = this._customersV2Service.customers();
        this.customer = this._customersV2Service.customer();
        // Open the drawer
        this._customersListComponent.matDrawer.open();
        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 

        // Create the customer form
        this.customerForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phoneNumbers: this._formBuilder.array([]),
            address: [null],
            activeProduct:  [true, [Validators.required]],
        });

        this._changeDetectorRef.markForCheck();

        this._customersListComponent.matDrawer.open();
        this.customerForm.patchValue(this.customer);

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
        return this._customersListComponent.matDrawer.close();
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
     * Update the customer
     */
    updateItem(): void {        
        this.customer = {...this._customer.getValue(), ...this.customerForm.getRawValue()};
        console.log('customer', this.customer);
        // Get the customer object
        // const customer = this.customerForm.getRawValue();

        // Update the customer on the server
        this._customersV2Service
            .updateItem(this.customer)
            .then(() => {
                // Toggle the edit mode off
                this.toggleEditMode(false);
            });
    }

    /**
     * Delete the customer
     */
    deleteProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimConfirmationService.open({
            title: 'Delete customer',
            message:
                'Are you sure you want to delete this customer? This action cannot be undone!',
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
                // Get the current customer's id
                const id = this.customer.id;

                // Get the next/previous customer's id
                const currentProductIndex = this.customers.findIndex(
                    (item) => item.id === id
                );
                const nextProductIndex =
                    currentProductIndex +
                    (currentProductIndex === this.customers.length - 1 ? -1 : 1);
                const nextProductId =
                    this.customers.length === 1 && this.customers[0].id === id
                        ? null
                        : this.customers[nextProductIndex].id;

                // Delete the customer
                this._customersV2Service
                    .deleteItem(id)
                    .then((isDeleted) => {
                        // Return if the customer wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next customer if available
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
        // this._customersV2Service.uploadAvatar(event.target.files[0], 'customers').subscribe({
        //     next: (response: any) => {
        //         this._axiomaimLoadingService.hide();
        //         console.log('uploadAvatar', response)
        //         this.customer.avatarPath = response.filePath;
        //         this.customer.avatarFile = response.fileName;
        //         this.customer.avatarType = response.fileType;
        //         this.customer.avatarUrl = response.fileUrl;
        //         this.customer.avatar = response.fileUrl;                
        //         this._customer.next(this.customer);
        //         console.log('customer', this.customer);
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
        const avatarFormControl = this.customerForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the customer
        // this.customer.avatar = null;
    }

    onOptionSelected(data: any[]) {
        console.log('onOptionSelected', data);
        // this.customer.customerRoles = data;
        this._customer.next(this.customer);
        // console.log('onOptionSelected', this.customer);
        // this.customer$.subscribe((resProduct: Product) => {

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
    //     const isTagApplied = this.customer.tags.find((id) => id === tag.id);

    //     // If the found tag is already applied to the customer...
    //     if (isTagApplied) {
    //         // Remove the tag from the customer
    //         this.removeTagFromProduct(tag);
    //     } else {
    //         // Otherwise add the tag to the customer
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
