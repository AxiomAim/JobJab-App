import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrumboardCardDetailsComponent } from 'app/modules/axiomaim/apps/scrumboard/card/details/details.component';

@Component({
    selector: 'option',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class SubscriptionsOptionComponent implements OnInit {
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
            .open(ScrumboardCardDetailsComponent, { autoFocus: false })
            .afterClosed()
            .subscribe(() => {
                // Go up twice because card routes are set up like this; "card/CARD_ID"
                this._router.navigate(['./../..'], {
                    relativeTo: this._activatedRoute,
                });
            });
    }
}
