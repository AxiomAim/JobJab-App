import { Component, inject, OnInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import {
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
import { UsersV2Service } from 'app/modules/axiomaim/administration/users/users-v2.service';
import {
  getAuth,
  PhoneAuthProvider,
  multiFactor,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  Auth,
  signInWithCredential,
  OAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
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
    ],
})
export class AuthSignInComponent implements OnInit {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _authService = inject(AuthService);
    private _usersV2Service = inject(UsersV2Service);
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: AxiomaimAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private ngZone: NgZone,

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        // await this._firebaseAuthV2Service.signOut();
        // await this._authService.signOut();
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.email],
            ],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    async signIn() {
        console.log('signInForm', this.signInForm.value);
      const credentials = this.signInForm.value;
        console.log('credentials', credentials);
        await this._firebaseAuthV2Service.signIn(credentials).then((loginUser: any) => {
            console.log('loginUser', loginUser);
          // const loginUser = this._firebaseAuthV2Service.loginUser();
          // console.log('loginUser', loginUser);
          // Return if the form is invalid
          if (this.signInForm.invalid) {
              return;
          }

          // Disable the form
          this.signInForm.disable();

          // Hide the alert
          this.showAlert = false;

          // Sign in
          this._authService.signIn(this.signInForm.value).subscribe(
              () => {
                  // Set the redirect url.
                  // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
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
              }
          );
        });
    }

      signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("🚀 ~ LoginComponent ~ .then ~ token:", token);
        // The signed-in user info.
        const user = result.user;
        console.log(
          "🚀 ~ LoginComponent ~ .then ~ user:",
          user.email,
          user.refreshToken
        );

        if (user) {
          this._firebaseAuthV2Service.signInGooglePopup().then(
            (response: any) => {
              console.log("🚀 ~ LoginComponent ~ .then ~ response:", response);
              if (response.user_roles.length > 1) {
                const data = {
                  user_roles: response["user_roles"],
                  username: response.email,
                  type: "google",
                  token: {
                    access_token: token,
                    refresh_token: user.refreshToken,
                  },
                };
                this.ngZone.run(() => {
                  
                });
              } else {
                const role_id = response.user_roles[0].role_id;
                const temp = {
                  role_id: role_id,
                  username: response.email,
                  type: "google",
                  token: {
                    access_token: token,
                    refresh_token: user.refreshToken,
                  },
                };
              }
            },
            (error) => {
              console.log("error");
            }
          );
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

}
