import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterOutlet,
} from '@angular/router';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { UsersV2Service } from 'app/modules/axiomaim/administration/users/users-v2.service';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import {
    BehaviorSubject,
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'select-user',
    templateUrl: './select-user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgClass,
        AsyncPipe,
        I18nPluralPipe,
        AxiomaimDrawerComponent,
        MatTooltipModule
        
    ],
})
export class SelectUserComponent implements OnInit, OnDestroy {
    @Output() userSelected: EventEmitter<User> = new EventEmitter<User>();
    _usersV2Service = inject(UsersV2Service);
    @ViewChild('selectUserDrawer') selectUserDrawer: AxiomaimDrawerComponent;

    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(
        null
    );
    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    private _user: BehaviorSubject<User | null> = new BehaviorSubject(
        null
    );
    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    userCount: number = 0;
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _axiomaimMediaWatcherService: AxiomaimMediaWatcherService,
        private _matDialog: MatDialog,
        
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    /**
     * On init
     */
    async ngOnInit() {
        const users = await this._usersV2Service.getAll();
        console.log('users', users);
        // Get the users
        this._users.next(await this._usersV2Service.users());
        this.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: User[]) => {
                // Update the counts
                this.userCount = users.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the product
        this._user.next(this._usersV2Service.user());
        this.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product: User) => {
                // Update the selected product
                this.selectedProduct = product;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._usersV2Service.search(query)
                )
            )
            .subscribe((resProducts) => {
                this._users.next(resProducts);
            });


        // Subscribe to media changes
        this._axiomaimMediaWatcherService.onMediaChange$
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

    openDrawer(): void {
        
        // Open the drawer
        this.selectUserDrawer.open();
    }

    /**
     * Close Drawer (does not save form data) 
     */
    closeDrawer(): void {        
        // Close the drawer
        this.selectUserDrawer.close();
    }



    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    setUser(user: any): void {
        this._usersV2Service.setUser(user);
        this.userSelected.emit(user);
        this.closeDrawer();
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
