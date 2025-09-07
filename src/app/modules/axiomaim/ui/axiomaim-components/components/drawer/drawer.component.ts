import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { AxiomaimDrawerComponent, AxiomaimDrawerMode } from '@axiomaim/components/drawer';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';

@Component({
    selector: 'drawer',
    templateUrl: './drawer.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimAlertComponent,
        AxiomaimHighlightComponent,
        MatTabsModule,
        AxiomaimDrawerComponent,
    ],
})
export class DrawerComponent {
    drawerMode: AxiomaimDrawerMode;
    drawerOpened: boolean;

    /**
     * Constructor
     */
    constructor(private _axiomaimComponentsComponent: AxiomaimComponentsComponent) {
        // Set the defaults
        this.drawerMode = 'side';
        this.drawerOpened = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer mode
     */
    toggleDrawerMode(): void {
        this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
    }

    /**
     * Toggle the drawer open
     */
    toggleDrawerOpen(): void {
        this.drawerOpened = !this.drawerOpened;
    }

    /**
     * Drawer opened changed
     *
     * @param opened
     */
    drawerOpenedChanged(opened: boolean): void {
        this.drawerOpened = opened;
    }

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._axiomaimComponentsComponent.matDrawer.toggle();
    }
}
