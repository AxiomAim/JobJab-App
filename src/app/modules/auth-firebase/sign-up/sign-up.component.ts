import { ChangeDetectorRef, Component, effect, inject, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    AbstractControl,
    ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { axiomaimAnimations } from '@axiomaim/animations';
import { AxiomaimAlertComponent, AxiomaimAlertType } from '@axiomaim/components/alert';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AuthService } from 'app/core/auth/auth.service';
import { LocalV2Service } from 'app/core/services/local-v2.service';
import { User, UserModel } from 'app/modules/axiomaim/administration/users/users.model';
import { UsersV2Service } from 'app/modules/axiomaim/administration/users/users-v2.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { ContactsService } from 'app/modules/axiomaim/apps/contacts/contacts.service';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'app/modules/axiomaim/crm/contacts/contacts.model';
import { NgClass } from '@angular/common';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

interface PhoneLabel {
    name: string;
    value: string;
}

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    imports: [
        RouterLink,
        AxiomaimAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        AddressLookupComponent,
        NgClass,
        MatRippleModule,
        MatTooltipModule,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        MatAutocompleteModule
    ],
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _usersV2Service = inject(UsersV2Service);
    private _localV2Service = inject(LocalV2Service);
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    public countries: Country[] = [];
    public phoneLabels: PhoneLabel[] = [
        { name: 'Mobile', value: 'mobile' },
        { name: 'Work', value: 'work' },
        { name: 'Home', value: 'home' },
        { name: 'Other', value: 'other' }
    ];

    alert: { type: AxiomaimAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public newUser: User = UserModel.emptyDto();

    /**
     * Custom validator for address (string or place object) - optional; make required by adding to form
     */
    private createAddressValidator(required: boolean = false): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;
            if (required && (!value || (typeof value === 'string' && !value.trim()))) {
                return { required: true };
            }
            if (typeof value === 'object' && !value.geometry) {
                return { invalidAddress: true };
            }
            return null;
        };
    }

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _contactsService: ContactsService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: ['', Validators.required],
            address: ['', [this.createAddressValidator()]],  // Optional; set true for required
            agreements: [false, Validators.requiredTrue],
            phoneNumbers: this._formBuilder.array([
                this._formBuilder.group({
                    country: ['us'],
                    phoneNumber: [''],
                    label: ['mobile'],
                })
            ]),
        });

        // Initialize form with empty user data
        this.updateFormData(UserModel.emptyDto());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes || [];
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * Get country by ISO code
     */
    getCountryByIso(iso: string): Country | undefined {
        if (!this.countries || !Array.isArray(this.countries)) {
            return undefined;
        }
        return this.countries.find(country => country.iso === iso);
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['us'],
            phoneNumber: [''],
            label: ['mobile'],
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.signUpForm.get('phoneNumbers') as UntypedFormArray).push(
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
        const phoneNumbersFormArray = this.signUpForm.get(
            'phoneNumbers'
        ) as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Sign up
     */
    async signUp() {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }
        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        console.log('signUpForm', this.signUpForm.value);
        console.log('Address:', this.signUpForm.value.address);  // Debug: Verify full place object
        try {
            // firebase-auth v2 sign up
            const newAuth = await this._firebaseAuthV2Service.signUp(this.signUpForm.value);
            console.log('newAuth', newAuth);
            this._router.navigateByUrl('/confirmation-required');
        } catch (err) {
            // Re-enable the form
            this.signUpForm.enable();

            // Reset the form
            this.signUpNgForm.resetForm();

            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Something went wrong, please try again.',
            };

            // Show the alert
            this.showAlert = true;
        }
    }


    /**
     * Update form data without recreating the form
     */
    updateFormData(data: User): void {
        // Patch simple values
        this.signUpForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address: data.address || '',
            email: data.email || '',
            company: data.company || '',
            agreements: data.agreements || false,
        });

        // Update phone numbers array
        const phoneNumbersArray = this.signUpForm.get('phoneNumbers') as UntypedFormArray;
        phoneNumbersArray.clear();
        const phoneNumbersFormGroups = data.phoneNumbers && data.phoneNumbers.length > 0 
            ? data.phoneNumbers.map((phoneNumber: any) => this._formBuilder.group({ 
                country: [phoneNumber.country || 'us'], 
                phoneNumber: [phoneNumber.phoneNumber || ''], 
                label: [phoneNumber.label || 'mobile'] 
            }))
            : [this._formBuilder.group({ country: ['us'], phoneNumber: [''], label: ['mobile'] })];

        phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
            phoneNumbersArray.push(phoneNumbersFormGroup);
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