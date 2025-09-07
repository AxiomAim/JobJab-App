import { Component, ViewEncapsulation } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { axiomaimAnimations } from '@axiomaim/animations';

@Component({
    selector: 'colors',
    templateUrl: './colors.component.html',
    animations: axiomaimAnimations,
    encapsulation: ViewEncapsulation.None,
    imports: [MatRippleModule],
})
export class ColorsComponent {
    /**
     * Constructor
     */
    constructor() {}
}
