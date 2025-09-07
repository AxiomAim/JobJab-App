import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';

@Component({
    selector: 'mock-api',
    templateUrl: './mock-api.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimAlertComponent,
        AxiomaimHighlightComponent,
    ],
})
export class MockApiComponent {
    /**
     * Constructor
     */
    constructor(private _axiomaimComponentsComponent: AxiomaimComponentsComponent) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._axiomaimComponentsComponent.matDrawer.toggle();
    }
}
