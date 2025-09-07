import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { axiomaimAnimations } from '@axiomaim/animations';
import { AxiomaimCardFace } from '@axiomaim/components/card/card.types';

@Component({
    selector: 'axiomaim-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: axiomaimAnimations,
    exportAs: 'axiomaimCard',
    imports: [],
})
export class AxiomaimCardComponent implements OnChanges {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_expanded: BooleanInput;
    static ngAcceptInputType_flippable: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() expanded: boolean = false;
    @Input() face: AxiomaimCardFace = 'front';
    @Input() flippable: boolean = false;

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'axiomaim-card-expanded': this.expanded,
            'axiomaim-card-face-back': this.flippable && this.face === 'back',
            'axiomaim-card-face-front': this.flippable && this.face === 'front',
            'axiomaim-card-flippable': this.flippable,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Expanded
        if ('expanded' in changes) {
            // Coerce the value to a boolean
            this.expanded = coerceBooleanProperty(
                changes.expanded.currentValue
            );
        }

        // Flippable
        if ('flippable' in changes) {
            // Coerce the value to a boolean
            this.flippable = coerceBooleanProperty(
                changes.flippable.currentValue
            );
        }
    }
}
