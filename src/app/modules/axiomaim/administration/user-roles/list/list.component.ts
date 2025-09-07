import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { DavesaMediaWatcherService } from '@davesa/services/media-watcher';
import {
    BehaviorSubject,
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';
import { UserRole } from '../user-role.model';
import { UserRolesV2Service } from '../userRolesV2.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRolesComposeComponent } from '../compose/compose.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'user-roles-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        RouterOutlet,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass,
        RouterLink,
        I18nPluralPipe,
        MatTooltipModule,
        GridModule,
        AsyncPipe
    ],
})
export class UserRolesListComponent implements OnInit, OnDestroy {
    _userRolesV2Service = inject(UserRolesV2Service);
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    private _userRoles: BehaviorSubject<UserRole[] | null> = new BehaviorSubject(
        null
    );
    get userRoles$(): Observable<UserRole[]> {
        return this._userRoles.asObservable();
    }

    private _userRole: BehaviorSubject<UserRole | null> = new BehaviorSubject(
        null
    );
    get userRole$(): Observable<UserRole> {
        return this._userRole.asObservable();
    }

    userRoleCount: number = 0;
    userRolesTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedUserRole: UserRole;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _davesaMediaWatcherService: DavesaMediaWatcherService,
        private _matDialog: MatDialog,
        
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the userRoles
        this._userRoles.next(this._userRolesV2Service.userRoles());
        this.userRoles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((userRoles: UserRole[]) => {
                console.log('userRoles', userRoles)
                // Update the counts
                this.userRoleCount = userRoles.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the userRole
        this._userRole.next(this._userRolesV2Service.userRole());
        this.userRole$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((userRole: UserRole) => {
                // Update the selected userRole
                this.selectedUserRole = userRole;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._userRolesV2Service.search(query)
                )
            )
            .subscribe((resUserRoles) => {
                this._userRoles.next(resUserRoles);
            });

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected user when drawer closed
                this.selectedUserRole = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._davesaMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(
                    (event) =>
                        (event.ctrlKey === true || event.metaKey) && // Ctrl or Cmd
                        event.key === '/' // '/'
                )
            )
            .subscribe(() => {
                // this.createItem();
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
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Open compose dialog
     */
    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(UserRolesComposeComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
