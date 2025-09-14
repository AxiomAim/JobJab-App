import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { FirebaseAuthV2Service } from '../auth-firebase/firebase-auth-v2.service';
import { User } from 'app/modules/axiomaim/administration/users/user.model';
import { UsersV2Service } from 'app/modules/axiomaim/administration/users/users-v2.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _usersV2Service = inject(UsersV2Service);
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User> {
        this._firebaseAuthV2Service.loadFromStorage();
        console.log('loginUser', this._firebaseAuthV2Service.loginUser());
        this._user.next(this._firebaseAuthV2Service.loginUser());
        return this._user;
        // return this._httpClient.get<User>('api/common/user').pipe(
        //     tap((user) => {
        //         this._user.next(user);
        //     })
        // );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        this._usersV2Service.updateItem(user);
        return this._user;
        // return this._httpClient.patch<User>('api/common/user', { user }).pipe(
        //     map((response) => {
        //         this._user.next(response);
        //     })
        // );
    }
}
