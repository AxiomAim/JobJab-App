import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
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
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RequestsV2Service } from 'app/core/services/data-services/requests/requests-v2.service';
import { QuotesV2Service } from 'app/modules/axiomaim/projects/quotes/quotes-v2.service';
import { JobsV2Service } from 'app/modules/axiomaim/jobjab/jobs/jobs-v2.service';
import { InvoicesV2Service } from 'app/modules/axiomaim/administration/invoices/invoices-v2.service';
import { CRMV2Service } from './crm.service';

@Component({
    selector: 'app-crm',
    templateUrl: './workflow.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatTooltipModule,
],
})
export class CRMComponent implements OnInit, OnDestroy {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    public _cRMV2Service = inject(CRMV2Service);
    today = signal<string>(new Date().toISOString());
    /**
     * Constructor
     */
    constructor(
        private _router: Router
    ) {
        this._cRMV2Service.getAll();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}
