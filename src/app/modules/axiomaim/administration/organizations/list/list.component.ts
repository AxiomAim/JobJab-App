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
import { Category } from 'app/core/models/category.model';
import {
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import { Organization } from '../organizations.model';
import { OrganizationsV2Service } from '../organizationsV2.service';
import { GridModule, GridComponent, TextWrapSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationsComposeComponent } from '../compose/compose.component';
import { SortByIndexPipe } from '@davesa/pipes/sortByIndex.pipe';


@Component({
    selector: 'organizations-list',
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
        SortByIndexPipe,
        GridModule
    ],
})
export class OrganizationsListComponent implements OnInit, OnDestroy {
    _organizationsV2Service = inject(OrganizationsV2Service);
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    organizations$: Observable<Organization[]>;
    organization$: Observable<Organization>;

    organizations: Organization[] = [];
    organization: Organization;

    organizationsCount: number = 0;
    organizationsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    categories: Category[];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedOrganization: Organization;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    viewTable: boolean = false;

    //ItemGrid
    @ViewChild('itemdGrid') public itemdGrid: GridComponent;
    public filters = { status: 'All', condition: 'All', other: 'All' };
    public pageSettings?: Object;
    public wrapSettings: TextWrapSettingsModel;
    public toolbar: ToolbarItems[] = ['Search'];
    public sortOptions: object;


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
        this.toolbar = ['Search'];
        this.wrapSettings = { wrapMode: 'Both' };
        this.pageSettings = { pageSizes: ['5', '10','15','20', 'All'], };
        this.sortOptions = { columns: [{ field: 'sort', direction: 'Ascending' }] };

        // Get the organizations
        this.organizations = this._organizationsV2Service.organizations() ? this._organizationsV2Service.organizations() : [];
        console.log('this.organizations', this.organizations)
        // this.organization$ = this._organizationsV2Service.organization$;
        // this.organizations$ = this._organizationsV2Service.organizations$;
        // this._organizationsV2Service.organizations$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((organizations: Organization[]) => {
                // Update the counts
                this.organizationsCount = this.organizations.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        // Get the organization
        // this._organizationsV2Service.organization$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((organization: Organization) => {
                // Update the selected organization
                this.selectedOrganization = this._organizationsV2Service.organization() ? this._organizationsV2Service.organization() : null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            // });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._organizationsV2Service.searchCsvObjects(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected organization when drawer closed
                this.selectedOrganization = null;

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


    selectedRow(event: any) {
        this._router.navigate(['apps/organizations/', event.data.id])
    }


    /**
     * Open compose dialog
     */
    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(OrganizationsComposeComponent);

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
