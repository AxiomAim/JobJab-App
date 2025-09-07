import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { OtherComponentsComponent } from 'app/modules/axiomaim/ui/other-components/other-components.component';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    imports: [MatIconModule, MatButtonModule, AxiomaimHighlightComponent],
})
export class SearchComponent {
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
