import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { GuidesComponent } from 'app/modules/axiomaim/docs/guides/guides.component';

@Component({
    selector: 'splash-screen',
    templateUrl: './splash-screen.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimAlertComponent,
        AxiomaimHighlightComponent,
    ],
})
export class SplashScreenCustomizationComponent {
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
