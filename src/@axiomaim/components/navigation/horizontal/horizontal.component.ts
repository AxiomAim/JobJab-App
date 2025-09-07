import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { axiomaimAnimations } from '@axiomaim/animations';
import { AxiomaimNavigationService } from '@axiomaim/components/navigation/navigation.service';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation/navigation.types';
import { AxiomaimUtilsService } from '@axiomaim/services/utils/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { AxiomaimHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { AxiomaimHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { AxiomaimHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
    selector: 'axiomaim-horizontal-navigation',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    animations: axiomaimAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'axiomaimHorizontalNavigation',
    imports: [
        AxiomaimHorizontalNavigationBasicItemComponent,
        AxiomaimHorizontalNavigationBranchItemComponent,
        AxiomaimHorizontalNavigationSpacerItemComponent,
    ],
})
export class AxiomaimHorizontalNavigationComponent
    implements OnChanges, OnInit, OnDestroy
{
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _axiomaimNavigationService = inject(AxiomaimNavigationService);
    private _axiomaimUtilsService = inject(AxiomaimUtilsService);

    @Input() name: string = this._axiomaimUtilsService.randomId();
    @Input() navigation: AxiomaimNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
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
        // Navigation
        if ('navigation' in changes) {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Make sure the name input is not an empty string
        if (this.name === '') {
            this.name = this._axiomaimUtilsService.randomId();
        }

        // Register the navigation component
        this._axiomaimNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Deregister the navigation component from the registry
        this._axiomaimNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
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
