import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    Component,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'axiomaim-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'axiomaimLoadingBar',
    imports: [MatProgressBarModule],
})
export class AxiomaimLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
    private _axiomaimLoadingService = inject(AxiomaimLoadingService);

    @Input() autoMode: boolean = true;
    mode: 'determinate' | 'indeterminate';
    progress: number = 0;
    show: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Auto mode
        if ('autoMode' in changes) {
            // Set the auto mode in the service
            this._axiomaimLoadingService.setAutoMode(
                coerceBooleanProperty(changes.autoMode.currentValue)
            );
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the service
        this._axiomaimLoadingService.mode$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.mode = value;
            });

        this._axiomaimLoadingService.progress$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.progress = value;
            });

        this._axiomaimLoadingService.show$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.show = value;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
