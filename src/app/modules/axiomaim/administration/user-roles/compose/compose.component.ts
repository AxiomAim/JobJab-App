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
import { AxiomaimConfirmationService } from '@axiomaim/services/confirmation';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { AxiomaimLoadingBarComponent } from '@axiomaim/components/loading-bar';
import { Router } from '@angular/router';
import { UserRolesV2Service } from '../userRolesV2.service';
import { UserRole, UserRoleModel } from '../user-role.model';
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
        AxiomaimLoadingBarComponent,
        AsyncPipe,
    ],
})
export class UserRolesComposeComponent implements OnInit {
    _usersV2Service = inject(UserRolesV2Service);
    _userRolesV2Service = inject(UserRolesV2Service);
    _router = inject(Router);
    _axiomaimLoadingService = inject(AxiomaimLoadingService);
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    
    userRole: UserRole = UserRoleModel.emptyDto();    
    private _userRole: BehaviorSubject<UserRole | null> = new BehaviorSubject(
        null
    );
    get userRole$(): Observable<UserRole> {
        return this._userRole.asObservable();
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
        public matDialogRef: MatDialogRef<UserRolesComposeComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _overlay: Overlay,
        private _renderer2: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _axiomaimConfirmationService: AxiomaimConfirmationService

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */ 
    ngOnInit(): void {
        this._userRole.next(this.userRole);
        this._userRolesV2Service.getAll().subscribe((resUserRoles: UserRole[]) => {
            this.userRoles = resUserRoles;
            this._userRoles.next(resUserRoles);
        });

        // Create the form
        this.composeForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]],
        });

        // Patch values to the form
        this.composeForm.patchValue(this.userRole);
        // Mark for check
        this._changeDetectorRef.markForCheck();
            
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): void {
        console.log('composeForm', this.composeForm.valid)
        if (this.composeForm.valid) {
            this.userRole.id = this.composeForm.value.code;
            const updateUserRole = { ...this.userRole, ...this.composeForm.value }
            this.userRole = updateUserRole;
            this._usersV2Service.createItem(this.userRole).subscribe((res) => {
                this.userRole = res;
                this._router.navigate(['']);
                this.matDialogRef.close(this.userRole);
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
