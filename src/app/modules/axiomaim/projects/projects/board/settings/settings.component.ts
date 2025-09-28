import { NgClass } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DavesaDrawerComponent } from '@davesa/components/drawer';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { SelectUsersComponent } from 'app/layout/common/select-users/select-users.component';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { UsersDataService } from 'app/modules/davesa/administration/users/users-data.service';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectBoard } from '../../project-board.model';
import { SelectMultiComponent } from 'app/layout/common/select-multi/select-multi.component';
import { UsersV2Service } from 'app/modules/davesa/administration/users/usersV2.service';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProjectsV2Service } from '../../ProjectsV2.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { SelectAutocompleteAvatarComponent } from 'app/layout/common/select-autocomplete-avatar/select-autocomplete-avatar.component';


@Component({
    selector: 'projects-board-settings',
    templateUrl: './settings.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        DavesaDrawerComponent,
        MatButtonModule,
        MatTooltipModule,
        SelectMultiComponent,
        // SelectAutocompleteAvatarComponent

    ],
})
export class ProjectsBoardSettingsComponent implements OnInit, OnDestroy {
    _usersV2Service = inject(UsersV2Service);
    _projectsV2Service = inject(ProjectsV2Service);
    private _snackBar = inject(MatSnackBar);
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    @ViewChild(DavesaDrawerComponent) boardSettingsDrawer: DavesaDrawerComponent;
    @Input() board: ProjectBoard;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    allUsers: User[] = [];
    projectBoard: ProjectBoard;
    loginUser: User;
    organization: Organization;
    
        private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(
            null
        );
        get users$(): Observable<User[]> {
            return this._users.asObservable();
        }
    

    /**
     * Constructor
     */
    constructor(

    ) {


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._usersV2Service.initialize().pipe(switchMap((res) => {
            this.loginUser = this._usersV2Service.loginUser();
            this.organization = this._usersV2Service.organization();
            return this._usersV2Service.getAllByOrgId(this.organization.id);
        })).subscribe((users) => {
            this._users.next(users);
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


    onOptionSelected(event: any) {
        this.board.users = event;
        this._projectsV2Service.updateProjectBoard(this.board.id, this.board).subscribe((res) => {
            this._snackBar.open('Saved', 'Close', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        });
    }
}
