import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Renderer2, ViewContainerRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { CustomersV2Service } from '../customers-v2.service';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';
import { Country, Customer, CustomerModel } from '../customers.model';
import { Overlay } from '@angular/cdk/overlay';

@Component({
    selector: 'customers-add-item',
    templateUrl: './add-item.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        MatRippleModule,
        MatTooltipModule,
        AxiomaimDrawerComponent,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        AlertMessagesComponent,
        MatCheckboxModule,
        MatDatepickerModule,
        TextFieldModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatSidenavModule,
        GridAllModule,
        AddressLookupComponent,
        RouterLink,
        NgClass,
    ]
})
export class CustomersAddItemComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() customer: Customer;
    @Output() customerCreated: EventEmitter<Customer> = new EventEmitter<Customer>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _alertMessagesService = inject(AlertMessagesService);
    _customersV2Service = inject(CustomersV2Service);

    formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);


    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    customerForm: UntypedFormGroup;
    #loginUser = signal<User | null>(null);
    showRole: string[] = ["admin"];
    user_roles: any[] = [];
    reLoad: boolean = true;
    sitePermission: boolean = false;
    complinePermission: boolean = false;
    specializePermission: boolean = false;
    isSiteMultiple: boolean = false;
    user_delegation_roles: any[] = [];
    sitesDropDownData: any[] = [];
    site_account_id: any[] = [];
    isLoading = signal<boolean>(false);
    public countries: Country[] = [];
    public newCustomer: Customer = CustomerModel.emptyDto();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _contactsService: ContactsService,
        private _changeDetectorRef: ChangeDetectorRef,

        private _activatedRoute: ActivatedRoute,
        private _renderer2: Renderer2,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef

        
    ) {
        console.log('#loginUser', this.#loginUser());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        console.log('this.newCustomer (ngOnInit)', this.newCustomer);
        await this._contactsService.getCountries();
        await this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;
                console.log('this.countries', this.countries);
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            if(this.customer !== null){
                this.newCustomer = this.customer;
            }
        this.setFormGroup();

    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Subscribe to drawer state changes and emit to parent
        // This needs to be in ngAfterViewInit because ViewChild is not available in ngOnInit
        this.newItemDrawer.openedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((opened: boolean) => {
                this.drawerStateChanged.emit(opened);
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
     * Set Form Group 
     */
    setFormGroup() {
        this.customerForm = this._formBuilder.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            company: ["", [Validators.required]],
            address: ["", [Validators.required]],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
          });

            // Clear the emails and phoneNumbers form arrays
            (this.customerForm.get('emails') as UntypedFormArray).clear();
            (
                this.customerForm.get('phoneNumbers') as UntypedFormArray
            ).clear();

            // Patch values to the form
            this.customerForm.patchValue(this.newCustomer);
            console.log('this.customerForm', this.customerForm);
            console.log('this.customer', this.newCustomer);

        // Setup the emails form array
        const emailFormGroups = [];

        if (this.newCustomer.emails.length > 0) {
            // Iterate through them
            this.newCustomer.emails.forEach((email) => {
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
            (this.customerForm.get('emails') as UntypedFormArray).push(
                emailFormGroup
            );
        });

        // Setup the phone numbers form array
        const phoneNumbersFormGroups = [];

        if (this.newCustomer.phoneNumbers.length > 0) {
            // Iterate through them
            this.newCustomer.phoneNumbers.forEach((phoneNumber) => {
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
                this.customerForm.get('phoneNumbers') as UntypedFormArray
            ).push(phoneNumbersFormGroup);
        });


    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
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
        (this.customerForm.get('emails') as UntypedFormArray).push(
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
        const emailsFormArray = this.customerForm.get(
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
        (this.customerForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.customerForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    openDrawer(): void {
        // Reset form to ensure clean state when opening
        this.resetForm();
        
        // Open the drawer
        this.newItemDrawer.open();
    }

    /**
     * Close Drawer (does not save form data) 
     */
    close(): void {
        // Comprehensive form reset to prevent validation errors on reopen
        this.resetForm();
        
        // Reset additional form-related properties
        this.resetAdditionalProperties();
        
        // Close the drawer
        this.newItemDrawer.close();
    }

    /**
     * Comprehensive form reset method
     */
    private resetForm(): void {
        // Reset form values
        this.customerForm.reset();
        
        // Clear all validation states
        this.customerForm.markAsUntouched();
        this.customerForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.customerForm.controls).forEach(key => {
            const control = this.customerForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them
        this.customerForm.patchValue({
            active: true,
            user_roles: [],
            site_account_id: [],
            user_delegation_roles: []
        }, { emitEvent: false });
    }

    /**
     * Reset additional component properties
     */
    private resetAdditionalProperties(): void {
        // Reset component-specific properties
        this.user_roles = [];
        this.site_account_id = [];
        this.user_delegation_roles = [];
        this.reLoad = true;
        this.sitePermission = false;
        this.complinePermission = false;
        this.specializePermission = false;
        this.isSiteMultiple = false;
    }




    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        console.log('onSubmit');
        this.newCustomer.orgId = this.loginUser.orgId;
        this.newCustomer.firstName = this.customerForm.get('firstName').value
        this.newCustomer.lastName = this.customerForm.get('lastName').value
        this.newCustomer.company = this.customerForm.get('company').value
        this.newCustomer.displayName = this.newCustomer.firstName + ' ' + this.newCustomer.lastName;
        this.newCustomer.emails = this.customerForm.get('emails').value
        this.newCustomer.phoneNumbers = this.customerForm.get('phoneNumbers').value
        this.newCustomer.address = this.customerForm.get('address').value
        if(this.customer === null){
            await this._customersV2Service.createItem(this.newCustomer);
            this.sendCustomer();
        } else {
            await this._customersV2Service.updateItem(this.newCustomer);
            this.sendCustomer();
        }
        
        // this.isLoading.set(true);
    }
              

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country {
        const response = this.countries.find((country) => country.iso === iso);
        return response;
    }

    sendCustomer() {
        this.customerCreated.emit(this.newCustomer);
        this.close();
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
