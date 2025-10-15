import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimCardComponent } from '@axiomaim/components/card';

@Component({
    selector: 'pricing',
    templateUrl: './pricing.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, NgClass, AxiomaimCardComponent, MatIconModule],
})
export class PricingComponent {
    yearlyBilling: boolean = true;

    /**
     * Constructor
     */
    constructor() {}
}
