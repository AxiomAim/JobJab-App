import { Injectable } from '@angular/core';
import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';
import { CRM as crmData } from 'app/mock-api/dashboards/crm/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class CRMMockApi {
    private _crm: any = crmData;

    /**
     * Constructor
     */
    constructor(private _axiomaimMockApiService: AxiomaimMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/dashboards/crm')
            .reply(() => [200, cloneDeep(this._crm)]);
    }
}
