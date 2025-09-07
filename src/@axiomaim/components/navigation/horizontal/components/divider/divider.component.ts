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
import { AxiomaimHorizontalNavigationComponent } from '@axiomaim/components/navigation/horizontal/horizontal.component';
import { AxiomaimNavigationService } from '@axiomaim/components/navigation/navigation.service';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'axiomaim-horizontal-navigation-divider-item',
    templateUrl: './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class AxiomaimHorizontalNavigationDividerItemComponent
    implements OnInit, OnDestroy
{
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _axiomaimNavigationService = inject(AxiomaimNavigationService);

    @Input() item: AxiomaimNavigationItem;
    @Input() name: string;

    private _axiomaimHorizontalNavigationComponent: AxiomaimHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._axiomaimHorizontalNavigationComponent =
            this._axiomaimNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._axiomaimHorizontalNavigationComponent.onRefreshed
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
