import { CdkScrollable } from '@angular/cdk/scrolling';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Board } from 'app/modules/axiomaim/apps/scrumboard/scrumboard.models';
import { ScrumboardService } from 'app/modules/axiomaim/apps/scrumboard/scrumboard.service';
import { DateTime } from 'luxon';
import { Subject, takeUntil } from 'rxjs';
import { ServicesAddItemComponent } from '../add-item/add-item.component';
import { ServiceOfferingsV2Service } from '../data-services/service-offerings-v2.service';
import { ServiceOffering } from '../data-services/service-offerings.model';

@Component({
    selector: 'scrumboard-boards',
    templateUrl: './boards.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CdkScrollable, 
        RouterLink, 
        MatIconModule,
        ServicesAddItemComponent
    ],
})
export class ScrumboardBoardsComponent implements OnInit, OnDestroy {
    public _serviceOfferingsV2Service = inject(ServiceOfferingsV2Service);
    boards: Board[];

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _scrumboardService: ScrumboardService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const allServiceOfferings = this._serviceOfferingsV2Service.serviceOfferings();
        console.log('Service Offerings', allServiceOfferings);
        // Get the boards
        // this._scrumboardService.boards$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((boards: Board[]) => {
        //         this.boards = boards;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Format the given ISO_8601 date as a relative date
     *
     * @param date
     */
    formatDateAsRelative(date: string): string {
        return DateTime.fromISO(date).toRelative();
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
