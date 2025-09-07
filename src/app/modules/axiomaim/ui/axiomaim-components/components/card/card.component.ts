import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AxiomaimCardComponent } from '@axiomaim/components/card';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimHighlightComponent,
        MatTabsModule,
        AxiomaimCardComponent,
    ],
})
export class CardComponent {
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
