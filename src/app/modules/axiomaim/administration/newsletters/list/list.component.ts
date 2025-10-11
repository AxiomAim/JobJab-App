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
import { Newsletter } from '../newsletters.model';
import { MatDialog } from '@angular/material/dialog';
import { NewslettersV2Service } from '../newsletters-v2.service';
import { NewslettersAddItemComponent } from '../add-item/add-item.component';

@Component({
    selector: 'newsletters-list',
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
        NewslettersAddItemComponent
    ],
})
export class NewslettersListComponent implements OnInit, OnDestroy {
    _newslettersV2Service = inject(NewslettersV2Service);
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    private _newsletters: BehaviorSubject<Newsletter[] | null> = new BehaviorSubject(
        null
    );
    get newsletters$(): Observable<Newsletter[]> {
        return this._newsletters.asObservable();
    }

    private _newsletter: BehaviorSubject<Newsletter | null> = new BehaviorSubject(
        null
    );
    get newsletter$(): Observable<Newsletter> {
        return this._newsletter.asObservable();
    }

    newsletterCount: number = 0;
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: Newsletter;
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
        // Get the newsletters
        this._newsletters.next(this._newslettersV2Service.newsletters());
        this.newsletters$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((newsletters: Newsletter[]) => {
                // Update the counts
                this.newsletterCount = newsletters.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the product
        this._newsletter.next(this._newslettersV2Service.newsletter());
        this.newsletter$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((product: Newsletter) => {
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
                    this._newslettersV2Service.search(query)
                )
            )
            .subscribe((resProducts) => {
                this._newsletters.next(resProducts);
            });

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected product when drawer closed
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
