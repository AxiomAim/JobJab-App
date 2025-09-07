import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimAlertComponent } from '@axiomaim/components/alert';
import { OtherComponentsComponent } from 'app/modules/axiomaim/ui/other-components/other-components.component';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    imports: [MatIconModule, MatButtonModule, AxiomaimAlertComponent],
})
export class OverviewComponent {
    /**
     * Constructor
     */
    constructor(private _otherComponentsComponent: OtherComponentsComponent) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._otherComponentsComponent.matDrawer.toggle();
    }
}
