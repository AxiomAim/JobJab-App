import { NgClass } from '@angular/common';
import { Component, OnChanges, SimpleChanges, inject, OnDestroy, OnInit, signal, effect, ViewChild, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, Renderer2, ViewContainerRef, Input, ChangeDetectionStrategy, computed, ViewChildren, QueryList, ElementRef } from '@angular/core';
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
import { Country, User, UserModel } from 'app/modules/axiomaim/administration/users/users.model';
import { Overlay } from '@angular/cdk/overlay';
import { UsersV2Service } from '../users-v2.service';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';
import { UserRole } from 'app/core/models/user-roles.model';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PhoneLabel } from 'app/core/models/phone-labels.model';
import { AxiomaimAlertType } from '@axiomaim/components/alert';

@Component({
    selector: 'users-add-item',
    templateUrl: './add-item.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }
            .user-roles {
                width: 100%;
            }
            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        MatAutocompleteModule
    ]
})
export class UsersAddItemComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() send: boolean = false;
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add User';
    @Output() userCreated: EventEmitter<User> = new EventEmitter<User>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _alertMessagesService = inject(AlertMessagesService);
    _usersV2Service = inject(UsersV2Service);

    @ViewChild('newItemDrawer') newItemDrawer: AxiomaimDrawerComponent;
    @Output() drawerStateChanged = new EventEmitter<boolean>();
  @ViewChildren('formInputs') formInputs: QueryList<ElementRef<HTMLInputElement>>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userForm: UntypedFormGroup;
    #loginUser = signal<User | null>(null);
    showRole: string[] = ["admin"];
    // userRoles: UserRole[] = [];
    phoneLabels: PhoneLabel[] = [];
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
    public newUser: User = UserModel.emptyDto();
    isPasswordVisible = false;

    alert: { type: AxiomaimAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;


    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    currentUserRole = new FormControl('');
    readonly userRoles = signal<UserRole[]>([]);
    readonly allUserRoles = signal<UserRole[]>([]);
    filteredUserRoles = computed(() => {
        const currentValue = (this.currentUserRole.value || '').toLowerCase();
        return currentValue
            ? this.allUserRoles().filter(role => role.name.toLowerCase().includes(currentValue))
            : this.allUserRoles().slice();
        });


    readonly announcer = inject(LiveAnnouncer);

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _axiomaimConfigService: AxiomaimConfigService,
        private _usersService: ContactsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _renderer2: Renderer2,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {
        // Create the basic form structure early
        this.userForm = this._formBuilder.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            address: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            active: [true],
            emails: this._formBuilder.array([]),
            phoneNumbers: this._formBuilder.array([]),
        });

        // Effect to watch for changes in the service signal
        effect(() => {
            const user = this._usersV2Service.user();
            const data = user || UserModel.emptyDto();
            this.newUser = data;
            this.updateFormData(data);
            this._changeDetectorRef.markForCheck();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        this.phoneLabels = await this._usersV2Service.getPhoneLabels();
        this.allUserRoles.set(await this._usersV2Service.userRoles());

        this._usersService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        this._changeDetectorRef.markForCheck();
    }


onInputFocus(event: FocusEvent): void {
  (event.target as HTMLInputElement).readOnly = false;
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
              // ... existing code ...
        // Set readonly on all inputs after view init
        this.formInputs?.forEach(input => {
            input.nativeElement.readOnly = true;
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

    ngOnChanges(changes: SimpleChanges): void {        
        // Handle changes to @Input() user if needed
        this.newUser = this._usersV2Service.user();
        this.updateFormData(this.newUser);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update form data without recreating the form
     */
    updateFormData(data: User): void {
        // Patch simple values
        this.userForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address: data.address || '',
            email: data.email || '',
        });

        // Update phone numbers array
        const phoneNumbersArray = this.userForm.get('phoneNumbers') as UntypedFormArray;
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
        (this.userForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.userForm.get(
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
        this.updateFormData(UserModel.emptyDto());
        
        // Clear all validation states
        this.userForm.markAsUntouched();
        this.userForm.markAsPristine();
        
        // Reset each form control individually to ensure clean state
        Object.keys(this.userForm.controls).forEach(key => {
            const control = this.userForm.get(key);
            if (control) {
                control.setErrors(null);
                control.markAsUntouched();
                control.markAsPristine();
            }
        });
        
        // Set default values for form fields that need them (if any)
        this.userForm.patchValue({
            active: true
        }, { emitEvent: false });
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Reset additional component properties
     */
    private resetAdditionalProperties(): void {
        // Reset component-specific properties
        this.userRoles.set([]);
        this.site_account_id = [];
        this.user_delegation_roles = [];
        this.reLoad = true;
        this.sitePermission = false;
        this.complinePermission = false;
        this.specializePermission = false;
        this.isSiteMultiple = false;
    }

    remove(userRole: UserRole): void {
        this.userRoles.update(currentRoles => {
            const index = currentRoles.indexOf(userRole);
            if (index < 0) {
                return currentRoles;
            }

            currentRoles.splice(index, 1);
            this.announcer.announce(`Removed ${userRole.name}`);
            return [...currentRoles];
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const selectedRole = event.option.value as UserRole;
        // Avoid duplicates
        if (!this.userRoles().some(role => role.name === selectedRole.name)) {
            this.userRoles.update(currentRoles => [...currentRoles, selectedRole]);
        }
        this.currentUserRole.setValue('');
        event.option.deselect();
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    /**
     * Submit and create User
     * Sned email to new user to set up their password
     * refreshes all users in service
     * closes the drawer 
     */

    async onSubmit() {
        this.newUser.orgId = this.loginUser.orgId;
        this.newUser.firstName = this.userForm.get('firstName').value
        this.newUser.lastName = this.userForm.get('lastName').value
        this.newUser.displayName = this.newUser.firstName + ' ' + this.newUser.lastName;
        this.newUser.email = this.userForm.get('email').value
        this.newUser.isActive = true;
        this.newUser.userRoles = this.userRoles();
        this.newUser.phoneNumbers = this.userForm.get('phoneNumbers').value
        this.newUser.address = this.userForm.get('address').value

        await this._firebaseAuthV2Service.signUpOrg(this.userForm.value, this.newUser).then((createdUser) => {
            console.log('Created User', createdUser);
            if(this.send) {
                this.sendContact();
            } else {
                this.close();
                this._router.navigateByUrl('/administration/users');
            }
        });

    }
              
    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country | undefined {
        const response = this.countries.find((country) => country.iso === iso);
        return response;
    }
    sendContact() {
        this.userCreated.emit(this.newUser);
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
    
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    
}