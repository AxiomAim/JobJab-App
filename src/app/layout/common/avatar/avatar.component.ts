import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
    AxiomaimNavigationService,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';

@Component({
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'add-item',
    imports: [
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule,
        RouterLink,
        MatTooltipModule,
    ],
})
export class AvatarComponent implements OnInit, OnDestroy {
@Input() avatar: string = '';
@Input() name: string = '';
@Output() selectedAvatar: EventEmitter<any> = new EventEmitter<any>();


    /**
     * Constructor
     */
    constructor(

    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    aetAvatar(event: any) {
        // this.customer = event;
        console.log('Avatar', event);
    }

}
