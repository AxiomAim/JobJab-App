import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'quote-normal',
    templateUrl: './quote-normal.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [MatIconModule, RouterLink, MatButtonModule],
})
export class QuoteNormalComponent {
    /**
     * Constructor
     */
    constructor() {}
}
