import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'projects-empty-details',
    templateUrl: './empty-details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatIconModule],
})
export class ProjectsEmptyDetailsComponent {
    /**
     * Constructor
     */
    constructor() {}
}
