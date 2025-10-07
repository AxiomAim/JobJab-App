import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'quote-scroll',
    templateUrl: './quote-scroll.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CdkScrollable, 
        MatIconModule, 
        RouterLink, 
        MatButtonModule
    ],
})
export class QuoteScrollComponent {
    /**
     * Constructor
     */
    constructor() {}
}
