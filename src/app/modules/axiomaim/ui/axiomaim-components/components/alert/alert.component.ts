import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AxiomaimAlertComponent, AxiomaimAlertService } from '@axiomaim/components/alert';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styles: [
        `
            axiomaim-alert {
                margin: 16px 0;
            }
        `,
    ],
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimHighlightComponent,
        MatTabsModule,
        AxiomaimAlertComponent,
    ],
})
export class AlertComponent {
    /**
     * Constructor
     */
    constructor(
        private _axiomaimAlertService: AxiomaimAlertService,
        private _axiomaimComponentsComponent: AxiomaimComponentsComponent
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Dismiss the alert via the service
     *
     * @param name
     */
    dismiss(name: string): void {
        // Dismiss
        this._axiomaimAlertService.dismiss(name);
    }

    /**
     * Show the alert via the service
     *
     * @param name
     */
    show(name: string): void {
        // Show
        this._axiomaimAlertService.show(name);
    }

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._axiomaimComponentsComponent.matDrawer.toggle();
    }
}
