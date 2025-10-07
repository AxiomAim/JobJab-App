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
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';
import { AxiomaimTouchService } from '@axiomaim/services/touch-dialog';
import { LeadsV2Service } from 'app/modules/axiomaim/crm/leads/leads-v2.service';
import { Lead } from 'app/modules/axiomaim/crm/leads/leads.model';

@Component({
    selector: 'leads-menu',
    templateUrl: './leads-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'leads-menu',
    imports: [
        MatButtonModule, 
        MatMenuModule, 
        NgTemplateOutlet,
        MatIconModule, 
        RouterLink
    ],
})
export class LeadsMenuComponent implements OnInit, OnDestroy {
    _leadsV2Service = inject(LeadsV2Service);
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    lead: Lead;
    leads: Lead[];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _axiomaimNavigationService: AxiomaimNavigationService,
        private _translocoService: TranslocoService,
        private _axiomaimTouchService: AxiomaimTouchService,
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
    touchLead(): void {
        // Open the confirmation dialog
        const confirmation = this._axiomaimTouchService.open({
            title: 'Add Touch',
            message:
                'Record a Touch Point for this Lead',
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
                // Get the current lead's id
                const id = this.lead.id;

                // Get the next/previous lead's id
                const currentProductIndex = this.leads.findIndex(
                    (item) => item.id === id
                );
                const nextProductIndex =
                    currentProductIndex +
                    (currentProductIndex === this.leads.length - 1 ? -1 : 1);
                const nextProductId =
                    this.leads.length === 1 && this.leads[0].id === id
                        ? null
                        : this.leads[nextProductIndex].id;

                // Delete the lead
                this._leadsV2Service
                    .deleteItem(id)
                    .then((isDeleted) => {
                        // Return if the lead wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next lead if available
                        if (nextProductId) {
                            this._router.navigate(['../', nextProductId], {
                                relativeTo: this._activatedRoute,
                            });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], {
                                relativeTo: this._activatedRoute,
                            });
                        }

                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
    }

}
