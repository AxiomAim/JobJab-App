import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import {
    AxiomaimNavigationItem,
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimAlertComponent,
        AxiomaimHighlightComponent,
        MatTabsModule,
    ],
})
export class NavigationComponent {
    /**
     * Constructor
     */
    constructor(
        private _axiomaimNavigationService: AxiomaimNavigationService,
        private _axiomaimComponentsComponent: AxiomaimComponentsComponent
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get navigation item
     *
     * @param itemId
     * @param navigationName
     */
    getNavItem(itemId, navigationName): AxiomaimNavigationItem | null {
        // Get the component -> navigation data -> item
        const navComponent =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                navigationName
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the navigation item
        const navigation = navComponent.navigation;
        const item = this._axiomaimNavigationService.getItem(itemId, navigation);
        console.log(item);
        return item;
    }

    /**
     * Update badge title
     *
     * @param itemId
     * @param navigationName
     * @param title
     */
    updateBadgeTitle(itemId, navigationName, title): void {
        // Get the component -> navigation data -> item
        const navComponent =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                navigationName
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the navigation item, update the badge and refresh the component
        const navigation = navComponent.navigation;
        const item = this._axiomaimNavigationService.getItem(itemId, navigation);
        item.badge.title = title;
        navComponent.refresh();
    }

    /**
     * Toggle disabled status
     *
     * @param itemId
     * @param navigationName
     */
    toggleDisabled(itemId, navigationName): void {
        // Get the component -> navigation data -> item
        const navComponent =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                navigationName
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the navigation item, update the badge and refresh the component
        const navigation = navComponent.navigation;
        const item = this._axiomaimNavigationService.getItem(itemId, navigation);
        item.disabled = !item.disabled;
        navComponent.refresh();
    }

    /**
     * Swap navigation data
     *
     * @param navigationName
     */
    swapNavigationData(navigationName): void {
        // Get the component -> navigation data -> item
        const navComponent =
            this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(
                navigationName
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // A navigation data to replace with
        const newNavigation: AxiomaimNavigationItem[] = [
            {
                id: 'supported-components',
                title: 'Supported components',
                subtitle: 'Compatible third party components',
                type: 'group',
                icon: 'memory',
                children: [
                    {
                        id: 'supported-components.apex-charts',
                        title: 'ApexCharts',
                        type: 'basic',
                        icon: 'insert_chart',
                        link: '/supported-components/apex-charts',
                    },
                    {
                        id: 'supported-components.google-maps',
                        title: 'Google Maps',
                        type: 'basic',
                        icon: 'map',
                        link: '/supported-components/google-maps',
                    },
                    {
                        id: 'supported-components.quill-editor',
                        title: 'Quill editor',
                        type: 'basic',
                        icon: 'font_download',
                        link: '/supported-components/quill-editor',
                    },
                    {
                        id: 'supported-components.youtube-player',
                        title: 'Youtube player',
                        type: 'basic',
                        icon: 'play_circle_filled',
                        link: '/supported-components/youtube-player',
                    },
                ],
            },
        ];

        // Replace the navigation data
        navComponent.navigation = newNavigation;
        navComponent.refresh();
    }

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._axiomaimComponentsComponent.matDrawer.toggle();
    }
}
