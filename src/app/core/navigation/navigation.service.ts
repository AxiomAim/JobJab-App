import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation';
import { UserRole } from '../models/user-roles.model';
import { FirebaseAuthV2Service } from '../auth-firebase/firebase-auth-v2.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {    
    private _httpClient = inject(HttpClient);
    private loginUser = inject(FirebaseAuthV2Service).loginUser();
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private _userRoles: ReplaySubject<UserRole[]> = new ReplaySubject<UserRole[]>();

    constructor(

    ) {
        this._httpClient.get<UserRole[]>('api/common/user-roles').pipe(
                tap((userRoles) => {
                    this._userRoles.next(userRoles);
                })
        ).subscribe();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
            return this._httpClient.get<Navigation>('api/common/navigation').pipe(
                tap((navigation) => {
                    var updatedNavigation: AxiomaimNavigationItem[] = [];
                    for (const key in navigation) {                        
                        if (navigation.hasOwnProperty(key)) {
                            var nav = navigation[key];
                            switch(key) {
                                case 'tablet':
                                    nav.forEach((menu: AxiomaimNavigationItem) => {
                                        const finalResult = this.hasNavigationAccess(menu, this.loginUser.userRoles)
                                        // console.log('finalResult', menu.id, finalResult);
                                        if(finalResult) {
                                            updatedNavigation.push(menu);
                                        }
                                    });
                                    navigation[key] = updatedNavigation;
                                    break;
                                case 'futuristic':
                                    nav.forEach((menu: AxiomaimNavigationItem) => {
                                        const finalResult = this.hasNavigationAccess(menu, this.loginUser.userRoles)
                                        // console.log('finalResult', menu.id, finalResult);
                                        if(finalResult) {
                                            updatedNavigation.push(menu);
                                        }
                                    });
                                    navigation[key] = updatedNavigation;
                                    break;
                                case 'horizontal':
                                    nav.forEach((menu: AxiomaimNavigationItem) => {
                                        const finalResult = this.hasNavigationAccess(menu, this.loginUser.userRoles)
                                        // console.log('finalResult', menu.id, finalResult);
                                        if(finalResult) {
                                            updatedNavigation.push(menu);
                                        }
                                    });
                                    navigation[key] = updatedNavigation;
                                    break;
                                case 'default':
                                    nav.forEach((menu: AxiomaimNavigationItem) => {
                                        const finalResult = this.hasNavigationAccess(menu, this.loginUser.userRoles)
                                        // console.log('finalResult', menu.id, finalResult);
                                        if(finalResult) {
                                            updatedNavigation.push(menu);
                                        }
                                    });
                                    navigation[key] = updatedNavigation;
                                    break;
                            }
                            // if(key === 'default') {
                            //     nav.forEach((menu: AxiomaimNavigationItem) => {
                            //         const finalResult = this.hasNavigationAccess(menu, loginUser.userRoles)
                            //         if(finalResult) {
                            //             updatedNavigation.push(menu);
                            //         }
                            //     });
                            //     navigation[key] = updatedNavigation;
                            // }


                            // console.log('updatedNavigation', updatedNavigation);
                        }
                    }
                    this._navigation.next(navigation);
            }));
    }

    // hasMenuAccess(menu: AxiomaimNavigationItem, userRoles: UserRole[]): boolean {
    //     const loginRoles = userRoles.map(role => role.id);
    //     const menuRoles = menu.userRoles;
    //     console.log('loginRoles', menu.id, loginRoles);
    //     console.log('menuRoles', menu.id, menuRoles);
    //     return menuRoles.some(role => loginRoles.includes(role));
    // }

    hasNavigationAccess(menu: AxiomaimNavigationItem, roles: UserRole[]): boolean {
        const userRoles = roles.map(role => role.value);
        const menuRoles = menu.userRoles;
        // Check if the navigation item has a userRoles property
        if (!menuRoles || menuRoles.length === 0) {
            return true; // Assume access if no roles are specified
        }        
        // Check if any of the user's roles are included in the userRoles array
        const res = menuRoles.some(role => userRoles.includes(role));
        return res;
    }

    //   hasNavigationAccess(navigation: AxiomaimNavigationItem, loginUser: { userRoles: UserRole[] }): boolean {
    //     // Check if the navigation item has an accessPermission property
    //     if (!navigation.hasOwnProperty('userRoles')) {
    //       return true; // Assume access if no permission is specified
    //     }
      
    //     // Check if any of the user's roles are included in the accessPermission array
    //     return navigation.userRoles.some(role => loginUser.userRoles.includes(role));
    //   }
}
