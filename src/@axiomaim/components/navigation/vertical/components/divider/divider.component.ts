import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { AxiomaimNavigationService } from '@axiomaim/components/navigation/navigation.service';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation/navigation.types';
import { AxiomaimVerticalNavigationComponent } from '@axiomaim/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'axiomaim-vertical-navigation-divider-item',
    templateUrl: './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class AxiomaimVerticalNavigationDividerItemComponent
    implements OnInit, OnDestroy
{
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _axiomaimNavigationService = inject(AxiomaimNavigationService);

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
}
