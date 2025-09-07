import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { axiomaimAnimations } from '@axiomaim/animations';

@Component({
    selector: 'confirmation-required-modern-reversed',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    imports: [RouterLink],
})
export class ConfirmationRequiredModernReversedComponent {
    /**
     * Constructor
     */
    constructor() {}
}
