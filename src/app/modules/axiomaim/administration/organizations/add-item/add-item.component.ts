import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import {
    AxiomaimConfig,
    AxiomaimConfigService,
} from '@axiomaim/services/config';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { AlertMessagesComponent } from 'app/layout/common/alert-messages/alert-messages.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AlertMessagesService } from 'app/layout/common/alert-messages/alert-messages.service';
import { User } from '../../users/users.model';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { OrganizationsV2Service } from '../organizations-v2.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'organizations-add-item',
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
        AddressLookupComponent,
        MatStepperModule,
        MatRadioModule,


    ]
})
export class OrganizationsAddItemComponent implements OnInit, AfterViewInit, OnDestroy {
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    _organizationsV2Service = inject(OrganizationsV2Service);
    _alertMessagesService = inject(AlertMessagesService);

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
    organizationForm: UntypedFormGroup;
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

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService
    ) {
        this.#loginUser.set(this._firebaseAuthV2Service.loginUser());
        console.log('#loginUser', this.#loginUser());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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
        this.organizationForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                name: ['', Validators.required],
                domain: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                address: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                facebook: ['', Validators.required],
                x: ['', Validators.required],
                linkedIn: ['', Validators.required],
                instagram: ['', Validators.required],
            }),
            step3: this._formBuilder.group({
                slides: this._formBuilder.array([]),
            }),
            step4: this._formBuilder.group({
                testimonials: this._formBuilder.array([]),
            }),
            step5: this._formBuilder.group({
                homeIntro: this._formBuilder.array([]),
            }),
            step6: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
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
        this.organizationForm.reset();
        
        // Clear all validation states
        this.organizationForm.markAsUntouched();
        this.organizationForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.organizationForm.controls).forEach(key => {
            const control = this.organizationForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them
        this.organizationForm.patchValue({
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
    

  /**
   * Get the form field helpers as string
   */
    getFormFieldHelpersAsString(): string {
      return this.formFieldHelpers.join(' ');
  }
    
}
