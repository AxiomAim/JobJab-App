import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { GuidesComponent } from 'app/modules/axiomaim/docs/guides/guides.component';

@Component({
    selector: 'prerequisites',
    templateUrl: './prerequisites.html',
    imports: [MatIconModule, MatButtonModule, AxiomaimHighlightComponent],
})
export class PrerequisitesComponent {
    /**
     * Constructor
     */
    constructor(private _guidesComponent: GuidesComponent) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._guidesComponent.matDrawer.toggle();
    }
}
