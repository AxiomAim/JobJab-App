import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import { CustomersAddItemComponent } from 'app/modules/axiomaim/crm/customers/add-item/add-item.component';
import { take } from 'rxjs';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'add-item',
    imports: [
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule,
        RouterLink,
        MatTooltipModule,
    ],
})
export class AddItemComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _axiomaimNavigationService: AxiomaimNavigationService,
        private _translocoService: TranslocoService
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

    setCustomer(event: any) {
        // this.customer = event;
        console.log('Customer created event received in QuoteComponent:', event);
    }

}
