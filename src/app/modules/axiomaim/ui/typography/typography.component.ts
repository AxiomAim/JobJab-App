import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';

@Component({
    selector: 'typography',
    templateUrl: './typography.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [AxiomaimHighlightComponent, RouterLink],
})
export class TypographyComponent {
    /**
     * Constructor
     */
    constructor() {}
}
