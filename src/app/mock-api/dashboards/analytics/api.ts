import { Injectable } from '@angular/core';
import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';
import { analytics as analyticsData } from 'app/mock-api/dashboards/analytics/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class AnalyticsMockApi {
    private _analytics: any = analyticsData;

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
            .onGet('api/dashboards/analytics')
            .reply(() => [200, cloneDeep(this._analytics)]);
    }
}
