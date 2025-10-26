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
import { Job } from '../jobs.model';
import { MatDialog } from '@angular/material/dialog';
import { JobsV2Service } from '../jobs-v2.service';
import { JobsAddItemComponent } from '../add-item/add-item.component';
import { MatChipsModule } from '@angular/material/chips';
import { PhonePipe } from '@axiomaim/pipes/phone.pipe';

@Component({
    selector: 'jobs-list',
    templateUrl: './list.component.html',
        styles: [
        `
        .example-box {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
        }

        .example-chip {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
        `,
    ],

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
        // AsyncPipe,
        I18nPluralPipe,
        JobsAddItemComponent,
        MatChipsModule,
        PhonePipe
    ],
})
export class JobsListComponent implements OnInit, OnDestroy {
    _jobsV2Service = inject(JobsV2Service);
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedItem: Job;
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
        // Update the selected contact
        this.selectedItem = this._jobsV2Service.job();

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) =>
                    // Search
                    this._jobsV2Service.search(query)
                )
            )
            .subscribe((resUsers) => {
                console.log('searchUsers', this._jobsV2Service.jobs());
                // this._contacts.next(resUsers);
            });

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                this.selectedItem = null;

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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
