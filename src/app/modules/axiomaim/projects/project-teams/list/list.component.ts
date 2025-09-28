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
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import {
    BehaviorSubject,
    Observable,
    Subject,
    filter,
    fromEvent,
    switchMap,
    takeUntil,
} from 'rxjs';
import { ProjectTeam } from '../project-teams.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComposeComponent } from '../compose/compose.component';
import { ProjectTeamsV2Service } from '../project-teams-v2.service';
import { ProjectTeamsAddItemComponent } from '../add-item/add-item.component';

@Component({
    selector: 'project-teams-list',
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
        AsyncPipe,
        I18nPluralPipe,
        ProjectTeamsAddItemComponent
    ],
})
export class ProjectTeamsListComponent implements OnInit, OnDestroy {
    _projectTeamsV2Service = inject(ProjectTeamsV2Service);
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    private _projectTeams: BehaviorSubject<ProjectTeam[] | null> = new BehaviorSubject(
        null
    );
    get projectTeams$(): Observable<ProjectTeam[]> {
        return this._projectTeams.asObservable();
    }

    private _projectTeam: BehaviorSubject<ProjectTeam | null> = new BehaviorSubject(
        null
    );
    get projectTeam$(): Observable<ProjectTeam> {
        return this._projectTeam.asObservable();
    }

    projectTeamCount: number = 0;
    projectTeamsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: ProjectTeam;
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
    ngOnInit(): void {
        // Get the projectTeams
        this._projectTeams.next(this._projectTeamsV2Service.projectTeams());
        this.projectTeams$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((projectTeams: ProjectTeam[]) => {
                // Update the counts
                this.projectTeamCount = projectTeams.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the projectTeam
        this._projectTeam.next(this._projectTeamsV2Service.projectTeam());
        this.projectTeam$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((projectTeam: ProjectTeam) => {
                // Update the selected projectTeam
                this.selectedProduct = projectTeam;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._projectTeamsV2Service.search(query)
                )
            )
            .subscribe((resProducts) => {
                this._projectTeams.next(resProducts);
            });

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected projectTeam when drawer closed
                this.selectedProduct = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
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
        const dialogRef = this._matDialog.open(ProductsComposeComponent);

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
