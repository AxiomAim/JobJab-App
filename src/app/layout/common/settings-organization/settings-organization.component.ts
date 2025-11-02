import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
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
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';
import { PhoneLabel } from 'app/core/models/phone-labels.model';
import { EmailLabel } from 'app/core/models/email-labels.model';
import { Organization, OrganizationModel } from 'app/modules/axiomaim/administration/organizations/organizations.model';
import { OrganizationsV2Service } from '../../../modules/axiomaim/administration/organizations/organizations-v2.service';
import { CloudStorageComponent } from '../cloud-storage/cloud-storage.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { Image } from 'app/core/models/image.model';
import { AxiomaimCardComponent } from '@axiomaim/components/card';

@Component({
    selector: 'settings-organization',
    templateUrl: './settings-organization.component.html',
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
        AddressLookupComponent,
        CloudStorageComponent,
        // ImageGalleryComponent,
        AxiomaimCardComponent
    ]
})
export class SettingsOrganizationComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() btnIcon: string = 'mat_outline:business';
    @Input() btnTitle: string = 'Organization Settings';
    @Input() external: boolean = false;
    @Output() organizationCreated: EventEmitter<Organization> = new EventEmitter<Organization>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    public _alertMessagesService = inject(AlertMessagesService);
    public _organizationsV2Service = inject(OrganizationsV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    itemForm: FormGroup;  // Typed for safety
    isLoading = signal<boolean>(false);
    public newOrganization: Organization = OrganizationModel.emptyDto();
    public address = new FormControl('');  // Standalone, but tied via formControlName in HTML
    emailLabels: EmailLabel[] = [];
    phoneLabels: PhoneLabel[] = [];
    
    lead: boolean = false;
    leadAt: string = null;
    customer: boolean = false;
    customerAt: string = null;
    cancel: boolean = false;
    cancelAt: string = null;
    public organization: Organization = OrganizationModel.emptyDto();
    public testImages: Image[] = []
    

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _contactsService: ContactsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
    ) {

        // // Effect to watch for changes in the service signal
        // effect(() => {
        //     const organization = this._organizationsV2Service.organization();
        //     const data = organization || OrganizationModel.emptyDto();
        //     this.newOrganization = data;
        //     this.updateFormData(data);
        //     this._changeDetectorRef.detectChanges();  // Force detection after effect to avoid NG0100
        // });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        // Create the basic form structure early (typed)
        this.itemForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            domain: [''],
            address: [''],
            phone: [''],
            email: [''],
            contact: [''],
            logo: [''],
            website: [''],
            facebook: [''],
            x: [''],
            linkedIn: [''],
            google: [''],
            instagram: [''],
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

    setupForm() {
        this.newOrganization = OrganizationModel.emptyDto();
        console.log('setupForm - newContact', this.newOrganization);
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
     * Update form data without recreating the form
     */
    updateFormData(data: Organization): void {
        // Patch simple values
        this.itemForm.patchValue({
            name: data.name || '',
            description: data.description || '',
            domain: data.domain || '',
            address: data.address || null,  // Added
            phone: data.phone || '',
            email: data.email || '',
            contact: data.contact || '',
            logo: data.logo || '',
            facebook: data.facebook || '',
            x: data.x || '',
            linkedIn: data.linkedIn || '',
            google: data.google || '',
            instagram: data.instagram || '',
            });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    

    async openDrawer() {
        await this._organizationsV2Service.getItem(this.loginUser.organization.id)
        this.organization = this._organizationsV2Service.organization();
        await this.itemForm.patchValue(this.organization);
        // Open the drawer
        this.newItemDrawer.open();
    }

    /**
     * Close Drawer (does not save form data) 
     */
    close(): void {        
        // Close the drawer
        this.newItemDrawer.close();
    }

    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        this.isLoading.set(true);
        try {
            let date: any = new Date().toISOString();
            this.organization.name = this.itemForm.get('name').value;
            this.organization.description = this.itemForm.get('description').value;
            this.organization.domain = this.itemForm.get('domain').value;
            this.organization.address = this.itemForm.get('address').value;  // Now from formGroup
            this.organization.phone = this.itemForm.get('phone').value;
            this.organization.email = this.itemForm.get('email').value;
            this.organization.contact = this.itemForm.get('contact').value;            
            this.organization.facebook = this.itemForm.get('facebook').value;
            this.organization.x = this.itemForm.get('x').value;
            this.organization.linkedIn = this.itemForm.get('linkedIn').value;
            this.organization.google = this.itemForm.get('google').value;
            this.organization.instagram = this.itemForm.get('instagram').value;            

            await this._organizationsV2Service.updateItem(this.organization);
            // await this._organizationsV2Service.getAll();
                    
            if(this.external){
                this.sendOrganization();
                this.close();
            } else {
                this.close();
                // this._router.navigate(['/crm/contacts']);
            }
        } finally {
            this.isLoading.set(false);
        }
    }
              
    sendOrganization() {
        this.organizationCreated.emit(this.newOrganization);
        this.close();
    }

    setAtDate(control: string) {
        switch(control) {
            case 'lead':
                if(this.lead === true){
                    this.leadAt = new Date().toISOString();
                } else {
                    this.leadAt = null;
                }
                break;
            case 'customer':
                if(this.customer === true){
                    this.customerAt = new Date().toISOString();
                } else {
                    this.customerAt = null;
                }
                break;
            case 'cancel':
                if(this.cancel === true){
                    this.cancelAt = new Date().toISOString();
                } else {
                    this.cancelAt = null;
                }
                break;

        }
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

    setFile(file): void { // Add type for clarity
        console.log('setFile - file received', file);   
        this.organization.logo = file.fileUrl;
        // const updatedValidation = { ...this.validation,  ...file}; // Create a shallow copy
        // this._validationsV2Service.updateItem(updatedValidation.id, updatedValidation).subscribe((validation) => {
        //     this.validation = validation;
        //     this.editMode = false;
        //     // Toggle the edit mode off
        //     this.toggleEditMode(false);
        // });
    }

    
}