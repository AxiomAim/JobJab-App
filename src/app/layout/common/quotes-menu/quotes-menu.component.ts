import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AxiomaimQuoteService } from '@axiomaim/services/quote-dialog';
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import { QuotesV2Service } from 'app/modules/axiomaim/projects/quotes/quotes-v2.service';
import { take } from 'rxjs';

@Component({
    selector: 'quotes-menu',
    templateUrl: './quotes-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'quotes-menu',
    imports: [
        MatButtonModule, 
        MatMenuModule, 
        NgTemplateOutlet,
        MatIconModule, 
        RouterLink, 
        RouterLink

    ],
})
export class QuotesMenuComponent implements OnInit, OnDestroy {
    _quotesV2Service = inject(QuotesV2Service);    
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _axiomaimNavigationService: AxiomaimNavigationService,
        private _translocoService: TranslocoService,
        private _axiomaimTouchService: AxiomaimQuoteService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            en: 'us',
            tr: 'tr',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                'mainNavigation'
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._axiomaimNavigationService.getItem(
            'dashboards.project',
            navigation
        );
        if (projectDashboardItem) {
            this._translocoService
                .selectTranslate('Project')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    projectDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._axiomaimNavigationService.getItem(
            'dashboards.analytics',
            navigation
        );
        if (analyticsDashboardItem) {
            this._translocoService
                .selectTranslate('Analytics')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    analyticsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }

        /**
     * Touch the lead
     */
    quoteDialog(): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimTouchService.open({
            title: 'Add Quote',
            message:
                'Create a new Quote',
            icon: {
                show: true,
                name: 'heroicons_solid:finger-print',
                color: 'primary',
            },
            actions: {
                confirm: {
                    label: 'Save',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Delete the lead

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }

}
