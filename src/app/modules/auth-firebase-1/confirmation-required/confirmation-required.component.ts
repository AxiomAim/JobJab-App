import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { axiomaimAnimations } from '@axiomaim/animations';

@Component({
    selector: 'auth-firebase-confirmation-required',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    standalone: true,
    imports: [RouterLink],
})
export class AuthFirebaseConfirmationRequiredComponent {
    /**
     * Constructor
     */
    constructor() {}
}
