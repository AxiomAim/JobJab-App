import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorkflowComponent } from 'app/layout/common/workflow/workflow.component';
import { CrmComponent } from 'app/layout/common/crm/crm.component';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'crm',
    templateUrl: './crm.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatTableModule,
        MatTooltipModule,
        WorkflowComponent,
        CrmComponent,
        DatePipe
    ],
})
export class CRMComponent implements OnInit, OnDestroy {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    today = signal<string>(new Date().toISOString());

    /**
     * Constructor
     */
    constructor(
        private _router: Router
    ) {

        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

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
