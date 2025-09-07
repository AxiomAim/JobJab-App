import { Injectable } from '@angular/core';
import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';
import { crypto as cryptoData } from 'app/mock-api/dashboards/crypto/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class CryptoMockApi {
    private _crypto: any = cryptoData;

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
        // @ Crypto - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/dashboards/crypto')
            .reply(() => [200, cloneDeep(this._crypto)]);
    }
}
