import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsCardDetailsComponent } from './details/details.component';

@Component({
    selector: 'projects-card',
    templateUrl: './card.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ProjectsCardComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Launch the modal
        this._matDialog
            .open(ProjectsCardDetailsComponent, { autoFocus: false, height: '1000px', width: '800px' })
            .afterClosed()
            .subscribe(() => {
                // Go up twice because card routes are set up like this; "card/CARD_ID"
                // this._router.navigate(['./csv/csv-projects/board', null], {
                //     relativeTo: this._activatedRoute,
                // });
            });
    }
}
