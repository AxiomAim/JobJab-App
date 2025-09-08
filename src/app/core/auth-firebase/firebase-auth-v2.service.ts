import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { signal, computed, inject, effect } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, fromEventPattern, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  getAuth, 
  sendPasswordResetEmail,
  Auth,
  signOut,
  getRedirectResult
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { UsersDataService } from 'app/modules/axiomaim/administration/users/users-data.service';
import { User, UserModel } from 'app/modules/axiomaim/administration/users/user.model';
import { signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Organization } from 'app/modules/axiomaim/administration/organizations/organizations.model';
import { OrganizationsDataService } from 'app/modules/axiomaim/administration/organizations/organizations-data.service';
import { AxiomaimConfigService, Scheme, Theme } from '@axiomaim/services/config';
// import { OrganizationsV2Service } from 'app/modules/axiomaim/administration/organizations/organizationsV2.service';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const LOGIN_USER = "loginUser";
const AUTH_LOGIN_USER = "authUser";
const ORGANIZATION = "organization";

export const FirebaseAuthV2Service = createInjectable(() => {
  const _router = inject(Router);
  // const _authService = inject(AuthService);

  const app = initializeApp(environment.firebaseConfig);
  const auth: Auth = getAuth(app);
  const _usersDataService = inject(UsersDataService);
  const _organizationsDataService = inject(OrganizationsDataService);
  const _axiomaimConfigService = inject(AxiomaimConfigService);

  // const _organizationsV2Service = inject(OrganizationsV2Service);
  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  // const user = signal<User | null>(null);
  const loginUserId = signal<string | null>(null);
  const provider = signal<any | null>(null);
  const authUser = signal<any | null>(null);
  const token = signal<any | null>(null);
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');
  const facebookProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider('apple.com');
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  const setLoginUser = (data: any) => {
    loginUser.set(data)
    setScheme();
    setTheme();
    setToStorage()
  }

  const loadFromStorage = () => {
    try {
      const jsonUser = encryptStorage.getItem(LOGIN_USER);
      loginUser.set(jsonUser)
      const jsonAuthUser = encryptStorage.getItem(AUTH_LOGIN_USER);
      authUser.set(jsonAuthUser)
      const jsonOrganization = encryptStorage.getItem(ORGANIZATION);
      organization.set(jsonOrganization)
    } catch(err) {

    }

  }

  const setToStorage = () => {
    try {
      encryptStorage.setItem(LOGIN_USER, JSON.stringify(loginUser()));
      encryptStorage.setItem(AUTH_LOGIN_USER, JSON.stringify(authUser()));
      encryptStorage.setItem(ORGANIZATION, JSON.stringify(organization()));
    } catch(err) {
      console.error('Error setting user to storage:', err);
    }
  }

  const removeFromStorage = () => {
    try {
      encryptStorage.removeItem(LOGIN_USER);
      encryptStorage.removeItem(AUTH_LOGIN_USER);
      encryptStorage.removeItem(ORGANIZATION);
    } catch(err) {
      console.error('Error removing Login User from storage:', err);
    }
  }


  const check = (): Observable<boolean> => {
    return new Observable((observer) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      auth.onAuthStateChanged(checkAuthUser => {
        if(checkAuthUser) {
          authUser.set(checkAuthUser);
          if(loginUser() === null) { 
            _usersDataService.getItem(checkAuthUser.uid).pipe(switchMap((thisUser: User) => {
              loginUser.set(thisUser);
              const domain = getDomainFromEmail(thisUser.email);
              return _organizationsDataService.getItem(domain).pipe(map(thisOrganization => {
                organization.set(thisOrganization);
                setToStorage();
                observer.next(true);
                observer.complete();
                return of(true);  
              }));
            })).subscribe();          
          } else {
            observer.next(true);
            observer.complete();
            return of(true);
          }

        } else {
          signOut().subscribe( 
            {
              next: (result) => {
                return of(false);
              },
              error: (error) => {
                return of(false);
              },
            }
          );
          observer.next(false);
          return of(false);

      }
      }, err => {
         observer.error(err);
      });
    });
  }  


const initializeAuth = (id: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // Your initialization logic here, potentially involving async operations.
    // Example:
    auth.onAuthStateChanged(user => {
        // Do something with the user
        console.log("Auth state changed", user);
        resolve();
    }, error => {
      console.error("Auth state error", error);
      reject(error);
    });
});
}



  const getUserAccount = (id: string): Observable<User> => {
      return new Observable((observer) => {
        _usersDataService.getItem(id).subscribe(thisUSer => {
        observer.next(thisUSer)
      })
    })
  }


  const updateStatus = (status: string) => {
    return new Observable((observer) => {
      loginUser.set({ ...loginUser(), status});
      setToStorage();
    });
  }

  const signIn = (credentials: { email: string; password: string }): Observable<User> => {
    const domain = getDomainFromEmail(credentials.email);
    return new Observable((observer) => {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((auth: any) => {
        authUser.set(auth)
        _usersDataService.getItem(auth.user.uid).pipe(switchMap((thisUser) => {
        const encodedData = btoa(credentials.password); // encode a string 
        thisUser.emailKey = encodedData;
        return _usersDataService.updateItem(thisUser).pipe(switchMap(updateUser => {
          updateUser.status = 'online';
          loginUser.set(updateUser);
          setScheme();
          setTheme();      
          setToStorage()
          return _organizationsDataService.getItem(domain).pipe(map(thisOrganization => {
            organization.set(thisOrganization);
            setToStorage();
            observer.next(thisUser);
          }));
        }));
        })).subscribe();
      })
    })
  }

  const getDomainFromEmail = (email: string): string => {
    const parts = email.split('@');
    if (parts.length > 1) {
      return parts[1];
    } else {
      return ''; // Or handle invalid email as needed
    }

  }

  const signUp = async (signup: any): Promise<any> => {
    const newAuth = createUserWithEmailAndPassword(auth, signup.email, signup.password);
    authUser.set(auth)
    return newAuth;
  };
  
  const sendEmailVerification = async (auth: any): Promise<any> => {
    const confirmEmail = sendEmailVerification(auth.currentUser);
    return confirmEmail;
  };

  // const signUp = (signup: any): Observable<User> => {
  //   return new Observable((observer) => {
  //     createUserWithEmailAndPassword(auth, signup.email, signup.password).then((auth: any) => {
  //       authUser.set(auth)
  //       console.log('Firebase signup', auth);
  //       const newUser = UserModel.emptyDto()
  //       newUser.id = auth.user.uid;
  //       newUser.domain = signup.domain;
  //       newUser.firstName = signup.firstName;
  //       newUser.lastName = signup.lastName;
  //       newUser.company = signup.company;
  //       newUser.agreements = signup.agreements;
  //       newUser.displayName = signup.firstName + ' ' + signup.lastName;
  //       newUser.emailSignature = signup.firstName + ' ' + signup.lastName + ' ' + signup.email;
  //       _usersDataService.createItem(newUser).subscribe(thisUser => {
  //         loginUser.set(newUser);
  //         setToStorage()
  //         observer.next(thisUser);
  //       })
  //     })
  //   })
  // }

    const signOut = (): Observable<boolean> => {
      return new Observable((observer) => {
        auth.signOut().then(() => {
          authUser.set(null)
          loginUser.set(null)
          setScheme();
          setTheme();      
          removeFromStorage();
          observer.next(true)
          return true;
        }).catch((error) => {
          observer.error(error);
          return false;
        });
      })
  }

  const sendPasswordReset = (email: string): Observable<boolean> => {
    return new Observable((observer) => {
    sendPasswordResetEmail(auth, email).then(() => {
      authUser.set(null)
      observer.next(true);  
    });
  })
}

  const reauthenticateUser = async (passwordObject: any): Promise<boolean> => {
    try {
      const reauthUser = loginUser(); 
      const decodedData: any = atob(reauthUser.emailKey);
      const password = passwordObject.password; 
      return password === decodedData;
    } catch (error: any) {
      // ... error handling ...
    }
  };

  const signInGoogleRedirect = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    await signInWithRedirect(auth, googleProvider);
    const result = await getRedirectResult(auth);
    if (result) {
      // This gives you a Google Access Token.
      // const token = credential.accessToken;
    return _usersDataService.getQuery('email', '==', result.user.email).subscribe((thisUser) => {
      if (thisUser.length > 0) {
        loginUser.set(thisUser[0]);
        setScheme();
        setTheme();    
        setToStorage();
        return loginUser();
      } else {
        const newUser = UserModel.emptyDto()
        newUser.id = result.user.uid;
        newUser.firstName = result.user.displayName;
        newUser.lastName = result.user.displayName;
        newUser.displayName = result.user.displayName;
        newUser.emailSignature = result.user.displayName + ' ' + result.user.email;
        _usersDataService.createItem(newUser).subscribe(thisUser => {          
          loginUser.set(thisUser);
          setScheme();
          setTheme();      
          setToStorage();
          return loginUser();
        })
      }
    })
  }
  }

  const signInGooglePopup = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    const result = await signInWithPopup(auth, googleProvider);
    authUser.set(result.user)
    loginUserId.set(result.user.uid)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    token.set(credential.accessToken)
    return _usersDataService.getQuery('email', '==', result.user.email).subscribe((thisUser) => {
      if (thisUser.length > 0) {
        loginUser.set(thisUser[0]);
        setScheme();
        setTheme();    
        setToStorage();
        return loginUser();
      } else {
        const newUser = UserModel.emptyDto()
        newUser.id = result.user.uid;
        newUser.firstName = result.user.displayName;
        newUser.lastName = result.user.displayName;
        newUser.displayName = result.user.displayName;
        newUser.emailSignature = result.user.displayName + ' ' + result.user.email;
        _usersDataService.createItem(newUser).subscribe(thisUser => {
          loginUser.set(thisUser);
          setScheme();
          setTheme();      
          setToStorage();
          return loginUser();
        })
      }
    })
  }
  
  const checkDomain = (domain: string): Observable<Organization> => {
    return _organizationsDataService.getItem(domain).pipe(tap(
      {
        next: (org) => {
          if(org) {
            organization.set(org);
            setToStorage();
            return org;
          } 
        },
        error: (error) => {
          return error;
        }
      }));
  }

  const setScheme = (): void => {
    const scheme: Scheme = loginUser().scheme;
    if(scheme) {
      _axiomaimConfigService.config = { scheme };
    }
    
  }

  const setTheme = (): void => {
    const theme: Theme = loginUser().theme;
    if(theme) {
      _axiomaimConfigService.config = { theme };  
    }
  }

  
  const setLayout = (layout: string): void => {
    // Clear the 'layout' query param to allow layout changes
    _router
        .navigate([], {
            queryParams: {
                layout: null,
            },
            queryParamsHandling: 'merge',
        })
        .then(() => {
            // Set the config
            _axiomaimConfigService.config = { layout };
        });
  }
    
  return {
    loginUser: computed(() => loginUser()),
    organization: computed(() => organization()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getUserAccount,
    reauthenticateUser,
    sendPasswordReset,
    signIn,
    signUp,
    signOut,
    setLoginUser,
    check,
    signInGoogleRedirect,
    signInGooglePopup,
    checkDomain,
    updateStatus,
    getDomainFromEmail,
    setScheme,
    setTheme,
    setLayout,
    initializeAuth,
    sendEmailVerification
  };
});


function next(value: boolean | Organization): void {
  throw new Error('Function not implemented.');
}

