import { inject, Injectable } from '@angular/core';
import { map, Observable, of, BehaviorSubject, tap } from 'rxjs';
import { FirebaseAuthV2Service } from '../auth-firebase/firebase-auth-v2.service';
import { UsersDataService } from 'app/modules/axiomaim/administration/users/users-data.service';
import { User } from 'app/modules/axiomaim/administration/users/user.model';
import { Router } from '@angular/router';
import { Scheme, Theme } from '@axiomaim/services/config';
// import { Organization } from 'app/modules/axiomaim/administration/organizations/organizations.model';

@Injectable({ providedIn: 'root' })
export class LoginUserService {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _loginUserDataService = inject(UsersDataService);
    // private _authService = inject(AuthService);
    private _router = inject(Router);
    // private _loginUser: ReplaySubject<User> = new ReplaySubject<User>(1);

    private _loginUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    // private _organization: BehaviorSubject<Organization> = new BehaviorSubject<Organization>(null);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set loginUser(value: User) {
        // Store the value
        this._loginUser.next(value);
    }

    get loginUser$(): Observable<User> {
        return this._loginUser.asObservable();
    }

    /**
     * Setter & getter for organization
     *
     * @param value
     */
    // set organization(value: Organization) {
    //     // Store the value
    //     this._organization.next(value);
    // }

    // get organization$(): Observable<Organization> {
    //     return this._organization.asObservable();
    // }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in loginUser data
     */
    initialize(): Observable<User> {
        this._firebaseAuthV2Service.loadFromStorage()
        const loginUser = this._firebaseAuthV2Service.loginUser();
        const organization = this._firebaseAuthV2Service.organization();
        if(loginUser) {
            loginUser.status = 'online';
            // if(organization) {
            //     this._organization.next(organization);
            // }
            this._loginUser.next(loginUser);
            return of(loginUser)    
        } else {
            return of(null)    
        }
    }

    get(): Observable<User> {
        const loginUser = this._loginUser.getValue();
        return of(loginUser)
    }

    // getOrganization(): Observable<Organization> {
    //     const organization = this._organization.getValue();
    //     return of(organization)
    // }

    /**
     * Update the loginUser
     *
     * @param loginUser
     */
    update(loginUser: User): Observable<any> {
        return this._loginUserDataService.updateItem(loginUser).pipe(
            map((response) => {
                this._loginUser.next(response);
            })
        );
    }

    /**
     * Update the loginUser
     *
     * @param loginUser
     */
    updateUserTheme(theme: Theme): Observable<any> {
        return this._loginUserDataService.updateItem({...this.loginUser, theme}).pipe(
            map((response) => {
                this._loginUser.next(response);
            })
        );
    }

    /**
     * Update the loginUser
     *
     * @param loginUser
     */
    updateUserScheme(scheme: Scheme): Observable<any> {
        return this._loginUserDataService.updateItem({...this.loginUser, scheme}).pipe(
            map((response) => {
                this._loginUser.next(response);
            })
        );
    }

    updateUserStatus(loginUser: User): Observable<any> {
        return this._loginUser.asObservable().pipe(tap(() => {
            this._loginUser.next(loginUser);
        }));
    }


    /**
     * Sign out
     */
    signOut(): Observable<any> {
        return this._firebaseAuthV2Service.signOut().pipe(tap(
            {
                next: () => {
                    this._loginUser.next(null);
                    this._router.navigateByUrl('sign-out');
                    // this._authService.signOut().subscribe(res => {
                    //     // const redirectURL =
                    //     // this._activatedRoute.snapshot.queryParamMap.get(
                    //     //     'redirectURL'
                    //     // ) || '/signed-in-redirect';
                
                    //     // Navigate to the redirect url
                    //     this._router.navigateByUrl('sign-out');
                    // })    

                    return of(null)
                },
                error: (error) => {
                    console.log('signOut error', error)
                    return of(null)
            }
        }));
    }    
    

}
