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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, finalize, Observable, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DavesaConfirmationService } from '@davesa/services/confirmation';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DavesaLoadingService } from '@davesa/services/loading';
import { DavesaLoadingBarComponent } from '@davesa/components/loading-bar';
import { Router } from '@angular/router';
import { UsersV2Service } from '../usersV2.service';
import { Country, User, UserModel } from '../user.model';
import { UserRole } from '../../user-roles/user-role.model';
import { UserRolesV2Service } from '../../user-roles/userRolesV2.service';
import { SelectCheckboxComponent } from 'app/layout/common/select-checkbox/select-checkbox.component';

interface PhonenumerType {
    value: string;
    viewValue: string;
  }

@Component({
    selector: 'users-compose',
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
        MatRippleModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        TextFieldModule,
        DavesaLoadingBarComponent,
        AsyncPipe,
        SelectCheckboxComponent
    ],
})
export class UsersComposeComponent implements OnInit {
    _usersV2Service = inject(UsersV2Service);
    _userRolesV2Service = inject(UserRolesV2Service);
    _router = inject(Router);
    _davesaLoadingService = inject(DavesaLoadingService);
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    countries: Country[];
    
    phonenumberTypes: PhonenumerType[] = [
        {value: 'mobile', viewValue: 'Mobile'},
        {value: 'work', viewValue: 'Work'},
        {value: 'home', viewValue: 'Home'},
        {value: 'other', viewValue: 'Other'},
      ];

    user: User = UserModel.emptyDto();    
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(
        null
    );
    get userRole$(): Observable<User> {
        return this._user.asObservable();
    }
    private _userRoles: BehaviorSubject<UserRole[] | null> = new BehaviorSubject(
        []
    );
    get userRoles$(): Observable<UserRole[]> {
        return this._userRoles.asObservable();
    }
    userRoles: UserRole[] = [];
    composeForm: UntypedFormGroup;
    countdown: number = 5;
    fileFormat: "image/png, image/jpeg";

    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<UsersComposeComponent>,
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
        this._user.next(this.user);
        this.countries = this._usersV2Service.countries();
        this._userRolesV2Service.getAll().subscribe((resUserRoles: UserRole[]) => {
            this.userRoles = resUserRoles;
            this._userRoles.next(resUserRoles);
        });

        const phonePattern = "^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"; 
        // Create the form
        this.composeForm = this._formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phoneNumbers: this._formBuilder.array([]),
            userRoles: [[]],
        });

        
        // Clear the emails and phoneNumbers form arrays
        (this.composeForm.get('phoneNumbers') as UntypedFormArray).clear();

        // Patch values to the form
        this.composeForm.patchValue(this.user);

        // Setup the phone numbers form array
        const phoneNumbersFormGroups = [];

        if (this.user.phoneNumbers.length > 0) {
            // Iterate through them
            this.user.phoneNumbers.forEach((phoneNumber) => {
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
            this.user.id = this.composeForm.value.code;
            const updateUser = { ...this.user, ...this.composeForm.value }
            this.user = updateUser;
            updateUser.displayName = `${updateUser.firstName} ${updateUser.lastName}`;
            updateUser.emailSignature = `${updateUser.displayName} ${updateUser.email}`;
            this._usersV2Service.createItem(this.user).subscribe((res) => {
                this.user = res;
                this._router.navigate(['administraion/users']);
                this.matDialogRef.close(this.user);
            });
    
        }
            return;
    }
    
    selectedOption(event: any) {
        this.composeForm.get('userRoles').setValue(event);
        console.log('selectedOption:form', this.composeForm.get('userRoles').value);
    }

    close() {
        this.matDialogRef.close();
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
