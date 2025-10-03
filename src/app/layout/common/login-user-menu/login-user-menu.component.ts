import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginUserService } from 'app/core/login-user/login-user.service';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
// import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'login-user-menu',
    templateUrl: './login-user-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'loginUser',
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        // NgClass,
        MatDividerModule,
    ],
})
export class LoginUserMenuComponent implements OnInit, OnDestroy {
    private _loginUserService = inject(LoginUserService);


    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    loginUser: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        // private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit()  {

        // Subscribe to user changes
        this._loginUserService.loginUser$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((loginUser: User) => {
                if(!loginUser) {
                    console.log('!loginUser', loginUser);
                    this._router.navigateByUrl('/sign-out');
                    this._router.navigate(['/sign-out']);
                }
                this.loginUser = loginUser;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.loginUser) {
            return;
        }

        // Update the user
        // this._loginUserService
        //     .update({
        //         ...this.loginUser,
        //         status,
        //     })
        //     .subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
