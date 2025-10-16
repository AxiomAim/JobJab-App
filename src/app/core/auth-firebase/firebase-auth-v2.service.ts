import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { signal, computed, inject, effect } from '@angular/core';
import { environment } from 'environments/environment';
import { 
  catchError, 
  firstValueFrom, 
  from, 
  fromEventPattern, 
  map, 
  Observable, 
  of, 
  switchMap, 
  tap, 
  throwError 
} from 'rxjs';
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
  signOut as signOutFirebase,
  getRedirectResult,
  sendEmailVerification,
  User as FirebaseUser
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { UsersDataService } from 'app/modules/axiomaim/administration/users/users-data.service';
import { User, UserModel } from 'app/modules/axiomaim/administration/users/users.model';
import { signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Organization, OrganizationModel } from 'app/modules/axiomaim/administration/organizations/organizations.model';
import { OrganizationsDataService } from 'app/modules/axiomaim/administration/organizations/organizations-data.service';
import { AxiomaimConfigService, Scheme, Theme } from '@axiomaim/services/config';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const LOGIN_USER = "loginUser";
const AUTH_LOGIN_USER = "authUser";
const ORGANIZATION = "organization";

export const FirebaseAuthV2Service = createInjectable(() => {
  const _router = inject(Router);
  const app = initializeApp(environment.firebaseConfig);
  const auth: Auth = getAuth(app);
  const _usersDataService = inject(UsersDataService);
  const _organizationsDataService = inject(OrganizationsDataService);
  const _axiomaimConfigService = inject(AxiomaimConfigService);

  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  const loginUserId = signal<string | null>(null);
  const authUser = signal<any | null>(null);
  const token = signal<any | null>(null);
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');
  const facebookProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider('apple.com');
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const actionCodeSettings = {
    url: `${window.location.origin}/auth/email-verified`,
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

  const initiate = async (): Promise<boolean> => {
    try {
      console.log('Initiating FirebaseAuthV2Service');
      loadFromStorage();          
      return true;
    } catch (error) {
      console.error('Error in initiate:', error);
      return false;
    }
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
      console.error('Error loading from storage:', err);
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
    return of(auth.currentUser).pipe(
      switchMap(user => {
        if (user) {
          authUser.set(user);
          return of(loginUser()).pipe(
            switchMap(currentUser => {
              if (!currentUser) {
                return _usersDataService.getItem(user.uid).pipe(
                  switchMap(thisUser => {
                    loginUser.set(thisUser);
                    const domain = getDomainFromEmail(thisUser.email);
                    return _organizationsDataService.getItem(domain).pipe(
                      tap(thisOrganization => {
                        if (thisOrganization) {
                          organization.set(thisOrganization);
                        }
                      }),
                      tap(() => setToStorage()),
                      map(() => true)
                    );
                  })
                );
              } else {
                const domain = getDomainFromEmail(currentUser.email);
                return _organizationsDataService.getItem(domain).pipe(
                  tap(thisOrganization => {
                    if (thisOrganization) {
                      organization.set(thisOrganization);
                    }
                  }),
                  tap(() => setToStorage()),
                  map(() => true)
                );
              }
            })
          );
        } else {
          const needsClear = !!loginUser();
          if (needsClear) {
            loginUser.set(null);
            organization.set(null);
            authUser.set(null);
            removeFromStorage();
          }
          return of(false);
        }
      }),
      catchError(err => {
        console.error('Error in check:', err);
        return of(false);
      })
    );
  }

  const getUserAccount = (id: string): Observable<User> => {
    return _usersDataService.getItem(id);
  }

  const updateStatus = (status: string): Observable<User> => {
    if (!loginUser()) {
      return throwError(() => new Error('No user logged in'));
    }
    const updated = { ...loginUser()!, status };
    loginUser.set(updated);
    setToStorage();
    return of(updated);
  }

  const signIn = async (credentials): Promise<User> => {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password).then(async (cred) => {
      authUser.set(cred);
      const thisUser: User = await firstValueFrom(_usersDataService.getItem(cred.user.uid));
      const thisOrganization: any = await firstValueFrom(_organizationsDataService.getItem(thisUser.orgId));
      const date = new Date().toISOString();
      thisUser.organization = thisOrganization;
      thisUser.login_at.push(date);
      thisUser.status = 'online';
      loginUser.set(thisUser);
      setScheme();
      setTheme();      
      setToStorage();
      await firstValueFrom(_usersDataService.updateItem(thisUser));     
      return thisUser;   
    }).catch((error) => {
      console.error('Error in signIn:', error);
      throw error;
    });
    return loginUser() as User;
  };


  const getDomainFromEmail = (email: string): string => {
    const parts = email.split('@');
    if (parts.length > 1) {
      return parts[1];
    } else {
      return ''; // Or handle invalid email as needed
    }
  }

  const signUp = async (signup: any): Promise<any> => {
    console.log('Sign up data:', signup);
    await createUserWithEmailAndPassword(auth, signup.email, signup.password).then(async (userCredential) => {
      console.log('User credential from Firebase:', userCredential);
      const org = OrganizationModel.emptyDto();
      const user = UserModel.emptyDto();
      user.firstName = signup.firstName;
      user.lastName = signup.lastName;
      user.displayName = signup.firstName + ' ' + signup.lastName;
      user.email = signup.email;
      user.emailSignature = signup.firstName + ' ' + signup.lastName + ' ' + signup.email;
      user.agreements = signup.agreements;
      user.id = userCredential.user.uid;
      org.name = signup.company;
      org.userId = user.id;
      const createdOrg = await firstValueFrom(_organizationsDataService.createItem(org));
      user.orgId = createdOrg.id;
      const createdUser = await firstValueFrom(_usersDataService.createItem(user));
      loginUser.set(createdUser);
      setScheme();
      setTheme();
      setToStorage();
      authUser.set(userCredential.user);
      loginUser.set(user);
      await sendEmailVerificationNew(userCredential.user);
      return loginUser();
    }).catch((error) => {
      console.error('Error during signUp:', error);
      throw error;
    });
  };
  
  const signUpOrg = async (signup: any, newUser: User): Promise<any> => {
    console.log('Sign up data:', signup);
    await createUserWithEmailAndPassword(auth, signup.email, signup.password).then(async (userCredential) => {
      console.log('User credential from Firebase:', userCredential);
      newUser.id = userCredential.user.uid;
      const createdUser = await firstValueFrom(_usersDataService.createItem(newUser));
      await sendEmailVerificationNew(userCredential.user);
      return createdUser;
    }).catch((error) => {
      console.error('Error during signUp:', error);
      throw error;
    });
  };

  const sendEmailVerificationNew = async (user: FirebaseUser): Promise<any> => {
    console.log('sendEmailVerification:', user);
    return sendEmailVerification(user, actionCodeSettings);
  };

  const signOutService = (): Observable<boolean> => {
    return from(signOutFirebase(auth)).pipe(
      tap(() => {
        authUser.set(null);
        loginUser.set(null);
        setScheme();
        setTheme();      
        removeFromStorage();
      }),
      map(() => true),
      catchError(err => throwError(() => err))
    );
  }

  const forgotPassword = (email: string): Observable<boolean> => {
    return from(sendPasswordResetEmail(auth, email)).pipe(
      tap(() => authUser.set(null)),
      map(() => true),
      catchError(err => throwError(() => err))
    );
  }

  const reauthenticateUser = async (passwordObject: any): Promise<boolean> => {
    try {
      const reauthUser = loginUser(); 
      if (!reauthUser || !reauthUser.emailKey) {
        return false;
      }
      const decodedData = atob(reauthUser.emailKey);
      const password = passwordObject.password; 
      return password === decodedData;
    } catch (error: any) {
      console.error('Error in reauthenticateUser:', error);
      return false;
    }
  };

  const processOAuthResult = async (result: any): Promise<User> => {
    authUser.set(result.user);
    loginUserId.set(result.user.uid);
    const users = await firstValueFrom(_usersDataService.getQuery('email', '==', result.user.email));
    if (users.length > 0) {
      const thisUser = users[0];
      loginUser.set(thisUser);
      setScheme();
      setTheme();    
      setToStorage();
      return thisUser;
    } else {
      const newUser = UserModel.emptyDto();
      newUser.id = result.user.uid;
      newUser.firstName = result.user.displayName || '';
      newUser.lastName = result.user.displayName || '';
      newUser.displayName = result.user.displayName || '';
      newUser.email = result.user.email;
      newUser.emailSignature = (result.user.displayName || '') + ' ' + result.user.email;
      const createdUser = await firstValueFrom(_usersDataService.createItem(newUser));
      loginUser.set(createdUser);
      setScheme();
      setTheme();      
      setToStorage();
      return createdUser;
    }
  };

  const signInGoogleRedirect = async (): Promise<User | void> => {
    const result = await getRedirectResult(auth);
    if (result) {
      return processOAuthResult(result);
    } else {
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      await signInWithRedirect(auth, googleProvider);
    }
  };

  const signInGooglePopup = async (): Promise<User> => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    token.set(credential.accessToken);
    return processOAuthResult(result);
  };
  
  const checkDomain = (domain: string): Observable<Organization | null> => {
    return _organizationsDataService.getItem(domain).pipe(
      tap(org => {
        if (org) {
          organization.set(org);
          setToStorage();
        }
      })
    );
  }

  const setScheme = (): void => {
    const scheme: Scheme = loginUser()?.scheme;
    if (scheme) {
      _axiomaimConfigService.config = { ..._axiomaimConfigService.config, scheme };
    }
  }

  const setTheme = (): void => {
    const theme: Theme = loginUser()?.theme;
    if (theme) {
      _axiomaimConfigService.config = { ..._axiomaimConfigService.config, theme };  
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
            _axiomaimConfigService.config = { ..._axiomaimConfigService.config, layout };
        });
  }

  return {
    loginUser: computed(() => loginUser()),
    organization: computed(() => organization()),
    initiate,
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getUserAccount,
    reauthenticateUser,
    forgotPassword,
    signIn,
    signUp,
    signOut: signOutService,
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
    sendEmailVerification: sendEmailVerificationNew,
    signUpOrg
  };
});