import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { axiomaimAnimations } from '@axiomaim/animations';

@Component({
    selector: 'confirmation-required-fullscreen',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    imports: [RouterLink],
})
export class ConfirmationRequiredFullscreenComponent {
    /**
     * Constructor
     */
    constructor() {}
}
