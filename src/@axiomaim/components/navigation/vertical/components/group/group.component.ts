import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    forwardRef,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimNavigationService } from '@axiomaim/components/navigation/navigation.service';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation/navigation.types';
import { AxiomaimVerticalNavigationBasicItemComponent } from '@axiomaim/components/navigation/vertical/components/basic/basic.component';
import { AxiomaimVerticalNavigationCollapsableItemComponent } from '@axiomaim/components/navigation/vertical/components/collapsable/collapsable.component';
import { AxiomaimVerticalNavigationDividerItemComponent } from '@axiomaim/components/navigation/vertical/components/divider/divider.component';
import { AxiomaimVerticalNavigationSpacerItemComponent } from '@axiomaim/components/navigation/vertical/components/spacer/spacer.component';
import { AxiomaimVerticalNavigationComponent } from '@axiomaim/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'axiomaim-vertical-navigation-group-item',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatIconModule,
        AxiomaimVerticalNavigationBasicItemComponent,
        AxiomaimVerticalNavigationCollapsableItemComponent,
        AxiomaimVerticalNavigationDividerItemComponent,
        forwardRef(() => AxiomaimVerticalNavigationGroupItemComponent),
        AxiomaimVerticalNavigationSpacerItemComponent,
    ],
})
export class AxiomaimVerticalNavigationGroupItemComponent
    implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _axiomaimNavigationService = inject(AxiomaimNavigationService);

    @Input() autoCollapse: boolean;
    @Input() item: AxiomaimNavigationItem;
    @Input() name: string;

    private _axiomaimVerticalNavigationComponent: AxiomaimVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._axiomaimVerticalNavigationComponent =
            this._axiomaimNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._axiomaimVerticalNavigationComponent.onRefreshed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
