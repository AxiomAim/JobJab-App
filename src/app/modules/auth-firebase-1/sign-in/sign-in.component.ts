import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormControl,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { axiomaimAnimations } from '@axiomaim/animations';
import { AxiomaimAlertComponent, AxiomaimAlertType } from '@axiomaim/components/alert';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { AuthService } from 'app/core/auth/auth.service';
import { LocalV2Service } from 'app/core/services/local-v2.service';
import { User } from 'app/modules/axiomaim/administration/users/user.model';
import { map, switchMap, switchMapTo } from 'rxjs';


@Component({
    selector: 'auth-firebase-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    standalone: true,
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
    ],
})
export class AuthFirebaseSignInComponent implements OnInit {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _localV2Service = inject(LocalV2Service);
    // private _organizationsV2Service = inject(OrganizationsV2Service);

    

    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: AxiomaimAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    loginUser: User;

    public domain = new FormControl(this._localV2Service.appDomain());
    public isDomainControl: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.signOut();
        // this.domain.setValue(this._localV2Service.appDomain());
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                null,
                [Validators.required, Validators.email],
            ],
            password: [null, Validators.required],
            rememberMe: [''],
        });
    }

    async signOut(): Promise<any> {
        return this._firebaseAuthV2Service.signOut();
    }

    // getSubDomainName() {
    //     const {hostname} = new URL(window.location.href);
    //     if (hostname.includes(DomainEnum.LOCALHOST)) {
    //         this.isDomainControl = true;
    //         this.orgDomainChange();
    //     } else {
    //         this.domain.setValue(hostname);
    //     }
    // }

    // orgDomainChange() {
    //     this.showAlert = false;
    //     console.log("domain", this.domain.value);
    //     this._firebaseAuthV2Service.checkDomain(this.domain.value).subscribe({
    //         next: (res: any) => {
    //             if(res) {
    //                 this.domain.setValue(this.domain.value);
    //                 this._localV2Service.setAppdomain(this.domain.value);
    //             }
    //         },
    //         error: (err) => {
    //             console.log("err", err);
    //             this.alert = {
    //                 type: "error",
    //                 message: JSON.stringify(err),
    //             };
    //             console.log("error", this.alert);

    //             // Show the alert
    //             this.showAlert = true;
    //         },
    //     });
    // }

    checkDomain() {
        this.showAlert = false;
        const orgDomain = this._firebaseAuthV2Service.getDomainFromEmail(this.signInForm.controls.email.value);
        console.log("orgDomain", orgDomain);
        this._firebaseAuthV2Service.checkDomain(orgDomain).subscribe(  
        {
            next: 
            (res: any) => {
                if(res) {
                    console.log("res", res);

                    this.domain.setValue(this.domain.value);
                    this._localV2Service.setAppdomain(this.domain.value);
                }
            },
            error: (err) => {
                console.log("err", err);
                this.alert = {
                    type: "error",
                    message: JSON.stringify(err),
                };
                console.log("error", this.alert);

                // Show the alert
                this.showAlert = true;
            },

        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        //Sign in
        this._firebaseAuthV2Service.signIn(this.signInForm.value).subscribe(data => {
            this.loginUser = data;
            this.localSignIn();    
        })
    }

    

    localSignIn(): void {
        this._authService.signIn({email: this.loginUser.email, password: this.loginUser.id}).pipe(map(
            () => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the loginUser
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();    
                // Reset the form
                this.signInNgForm.resetForm();    
                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email or password',
                };

                // Show the alert
                this.showAlert = true;
            })).subscribe(
            {
                next: 
                () => {},
                error: (error) => {
                                            // Set the alert
                this.alert = {
                    type: 'error',
                    message: error.message,
                };

                // Show the alert
                this.showAlert = true;

                }

            }
        )
    }

    googleSignInPopup(): void {
        // Hide the alert
        this.showAlert = false;         
        // Google Sign in
        this._firebaseAuthV2Service.signInGooglePopup()
          .then((thisloginUser: any) => {

            if(thisloginUser) {
                this.loginUser = thisloginUser;
                this.localSignIn();    
            }
          })
      }
    
      googleSignInRedirect(): void {
        // Hide the alert
        this.showAlert = false;         
        // Google Sign in
        this._firebaseAuthV2Service.signInGoogleRedirect()
          .then((thisloginUser: any) => {
            console.log('thisloginUser', thisloginUser);

            if(thisloginUser) {
                this.loginUser = thisloginUser;
                this.localSignIn();    
            }
          })
      }

      clearCache(): void {
        console.log('clearCache');
        this._localV2Service.removeFromStorage();
        this._firebaseAuthV2Service.removeFromStorage();
        this.alert = {  type: 'success',  message: 'Cache cleared successfully',};
        this.showAlert = true;
      }


    }
