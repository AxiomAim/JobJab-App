import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { GuidesComponent } from 'app/modules/axiomaim/docs/guides/guides.component';

@Component({
    selector: 'installation',
    templateUrl: './installation.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimAlertComponent,
        AxiomaimHighlightComponent,
    ],
})
export class InstallationComponent {
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
