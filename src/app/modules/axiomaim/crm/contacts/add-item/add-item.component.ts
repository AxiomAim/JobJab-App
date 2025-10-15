import { NgClass } from '@angular/common';
import { Component, OnChanges, inject, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Renderer2, ViewContainerRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
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
import { ContactsV2Service } from '../contacts-v2.service';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';
import { Country, Contact, ContactModel } from '../contacts.model';
import { Overlay } from '@angular/cdk/overlay';
import { SourcesV2Service } from '../../sources/sources-v2.service';

@Component({
    selector: 'contacts-add-item',
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
export class ContactsAddItemComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    // @Input() contact: Contact;
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add Contact';
    @Output() contactCreated: EventEmitter<Contact> = new EventEmitter<Contact>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _alertMessagesService = inject(AlertMessagesService);
    _contactsV2Service = inject(ContactsV2Service);
    _sourcesV2Service = inject(SourcesV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    contactForm: UntypedFormGroup;
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
    public newContact: Contact = ContactModel.emptyDto();

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

        // Create the basic form structure early
        this.contactForm = this._formBuilder.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            company: ["", [Validators.required]],
            address: ["", [Validators.required]],
            lead: [false, [Validators.required]],
            leadAt: [''],
            customer: [false, [Validators.required]],
            source: [{}, [Validators.required]],
            customerAt: [''],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const contact = this._contactsV2Service.contact();
            console.log('Signal contact changed', contact);
            const data = contact || ContactModel.emptyDto();
            console.log('Signal data', data);
            this.newContact = data;
            this.updateFormData(data);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        console.log('Signal contact (ngOnInit)', this._contactsV2Service.contact());
        await this._contactsService.getCountries();
        await this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
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

    ngOnChanges(): void {        
        // Handle changes to @Input() contact if needed
        this.newContact = this._contactsV2Service.contact();
        this.updateFormData(this.newContact);
    }


    /**
     * Update form data without recreating the form
     */
    updateFormData(data: Contact): void {
        // Patch simple values
        this.contactForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            company: data.company || '',
            address: data.address || '',
            lead: data.lead || false,
            leadAt: data.leadAt || '',
            customer: data.customer || false,
            customerAt: data.customerAt || ''
        });

        console.log('this.contactForm', this.contactForm);
        console.log('this.contact', data);

        // Update emails array
        const emailsArray = this.contactForm.get('emails') as UntypedFormArray;
        emailsArray.clear();
        const emailFormGroups = data.emails && data.emails.length > 0 
            ? data.emails.map((email) => this._formBuilder.group({ email: [email.email || ''], label: [email.label || ''] }))
            : [this._formBuilder.group({ email: [''], label: [''] })];

        emailFormGroups.forEach((emailFormGroup) => {
            emailsArray.push(emailFormGroup);
        });

        // Update phone numbers array
        const phoneNumbersArray = this.contactForm.get('phoneNumbers') as UntypedFormArray;
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
        (this.contactForm.get('emails') as UntypedFormArray).push(
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
        const emailsFormArray = this.contactForm.get(
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
        (this.contactForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.contactForm.get(
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
        // Update to empty data
        this.updateFormData(ContactModel.emptyDto());
        
        // Clear all validation states
        this.contactForm.markAsUntouched();
        this.contactForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.contactForm.controls).forEach(key => {
            const control = this.contactForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them (if any)
        this.contactForm.patchValue({
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
        let date: any = new Date().toISOString();

        this.newContact.orgId = this.loginUser.orgId;
        this.newContact.firstName = this.contactForm.get('firstName').value
        this.newContact.lastName = this.contactForm.get('lastName').value
        this.newContact.company = this.contactForm.get('company').value
        this.newContact.displayName = this.newContact.firstName + ' ' + this.newContact.lastName;
        this.newContact.emails = this.contactForm.get('emails').value
        this.newContact.phoneNumbers = this.contactForm.get('phoneNumbers').value
        this.newContact.address = this.contactForm.get('address').value
        if(this.contactForm.get('lead').value === true){
            this.newContact.leadAt = date
        }
        if(this.contactForm.get('customer').value === true){
            this.newContact.customerAt = date
        }
        if(this._contactsV2Service.contact() === null){
            await this._contactsV2Service.createItem(this.newContact);
            this.sendContact();
        } else {
            await this._contactsV2Service.updateItem(this.newContact);
            this.sendContact();
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

    sendContact() {
        this.contactCreated.emit(this.newContact);
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