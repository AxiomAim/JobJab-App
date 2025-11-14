import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AxiomaimFullscreenComponent } from '@axiomaim/components/fullscreen';
import { AxiomaimLoadingBarComponent } from '@axiomaim/components/loading-bar';
import {
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
// import { User } from 'app/core/user/user.types';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { LoginUserMenuComponent } from 'app/layout/common/login-user-menu/login-user-menu.component';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { OrganizationComponent } from 'app/layout/common/organization/organization.component';
import { AddItemComponent } from 'app/layout/common/add-item/add-item.component';
import { SettingsOrganizationComponent } from 'app/layout/common/settings-organization/settings-organization.component';
import { StagesListComponent } from 'app/layout/common/stages-list/stages-list.component';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        AxiomaimLoadingBarComponent,
        AxiomaimVerticalNavigationComponent,
        NotificationsComponent,
        LoginUserMenuComponent,
        MatIconModule,
        MatButtonModule,
        // LanguagesComponent,
        AxiomaimFullscreenComponent,
        SearchComponent,
        // ShortcutsComponent,
        MessagesComponent,
        RouterOutlet,
        QuickChatComponent,
        // CustomersMenuComponent,
        OrganizationComponent,
        AddItemComponent,
        SettingsOrganizationComponent,
        StagesListComponent
        
        
    ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    isAdmin: boolean;
    isScreenSmall: boolean;
    navigation: Navigation;
    // loginUser: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _axiomaimMediaWatcherService: AxiomaimMediaWatcherService,
        private _axiomaimNavigationService: AxiomaimNavigationService
    ) {
        this.isAdmin = this.loginUser.userRoles?.some(role => role.value?.toLowerCase() === 'owner') ?? false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to the user service
        // this._userService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user: User) => {
        //         this.loginUser = user;
        //     });

        // Subscribe to media changes
        this._axiomaimMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
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
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}