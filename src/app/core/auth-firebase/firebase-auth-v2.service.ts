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
import { UsersDataService } from 'app/modules/davesa/administration/users/users-data.service';
import { User, UserModel } from 'app/modules/davesa/administration/users/user.model';
import { signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { OrganizationsDataService } from 'app/modules/davesa/administration/organizations/organizations-data.service';
import { DavesaConfigService, Scheme, Theme } from '@davesa/services/config';
// import { OrganizationsV2Service } from 'app/modules/davesa/administration/organizations/organizationsV2.service';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const LOGIN_USER = "loginUser";
const AUTH_LOGIN_USER = "authUser";
const ORGANIZATION = "organization";

export const FirebaseAuthV2Service = createInjectable(() => {
  const _router = inject(Router);
  // const _authService = inject(AuthService);

  const app = initializeApp(environment.firebase);
  const auth: Auth = getAuth(app);
  const _usersDataService = inject(UsersDataService);
  const _organizationsDataService = inject(OrganizationsDataService);
  const _davesaConfigService = inject(DavesaConfigService);

  // const _organizationsV2Service = inject(OrganizationsV2Service);
  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  // const user = signal<User | null>(null);
  const loginUserId = signal<string | null>(null);
  const provider = signal<any | null>(null);
  const authUser = signal<any | null>(null);
  const token = signal<any | null>(null);
  const loading = signal(false);
  const error = signal<string | null>(null);
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
    loading.set(true);
    error.set(null);  
    loginUser.set(data)
    setScheme();
    setTheme();
    setToStorage()
    loading.set(false);
  }

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonUser = encryptStorage.getItem(LOGIN_USER);
      loginUser.set(jsonUser)
      const jsonAuthUser = encryptStorage.getItem(AUTH_LOGIN_USER);
      authUser.set(jsonAuthUser)
      const jsonOrganization = encryptStorage.getItem(ORGANIZATION);
      organization.set(jsonOrganization)
    } catch(err) {
      error.set(err)
    }
    loading.set(false);

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.setItem(LOGIN_USER, JSON.stringify(loginUser()));
      encryptStorage.setItem(AUTH_LOGIN_USER, JSON.stringify(authUser()));
      encryptStorage.setItem(ORGANIZATION, JSON.stringify(organization()));
    } catch(err) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.removeItem(LOGIN_USER);
      encryptStorage.removeItem(AUTH_LOGIN_USER);
      encryptStorage.removeItem(ORGANIZATION);
    } catch(err) {
      error.set(err)
      console.error('Error removing Login User from storage:', err);
    }
    loading.set(false);
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
        loading.set(true);
        error.set(null);  
        _usersDataService.getItem(id).subscribe(thisUSer => {
        loading.set(false);
        error.set(null);  
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
      loading.set(true);
      error.set(null);  
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
            loading.set(false);
            error.set(null);
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


  const signUp = (signup: any): Observable<User> => {
    return new Observable((observer) => {
      loading.set(true);
      error.set(null);  
      createUserWithEmailAndPassword(auth, signup.email, signup.password).then((auth: any) => {
        authUser.set(auth)
        const newUser = UserModel.emptyDto()
        newUser.id = auth.user.uid;
        newUser.domain = signup.domain;
        newUser.firstName = signup.firstName;
        newUser.lastName = signup.lastName;
        newUser.displayName = signup.firstName + ' ' + signup.lastName;
        newUser.emailSignature = signup.firstName + ' ' + signup.lastName + ' ' + signup.email;
        _usersDataService.createItem(newUser).subscribe(thisUser => {
          loginUser.set(newUser);
          setToStorage()
          loading.set(false);
          error.set(null);
          observer.next(thisUser);
        })
      })
    })
  }

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
      loading.set(true);
    error.set(null);  
    sendPasswordResetEmail(auth, email).then(() => {
      authUser.set(null)
      loading.set(false);
      error.set(null);  
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
        loading.set(false);
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
          loading.set(false);
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
    loading.set(true);
    error.set(null);  
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
        loading.set(false);
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
          loading.set(false);
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
      _davesaConfigService.config = { scheme };
    }
    
  }

  const setTheme = (): void => {
    const theme: Theme = loginUser().theme;
    if(theme) {
      _davesaConfigService.config = { theme };  
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
            _davesaConfigService.config = { layout };
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
    initializeAuth
  };
});


function next(value: boolean | Organization): void {
  throw new Error('Function not implemented.');
}

