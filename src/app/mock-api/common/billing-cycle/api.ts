import { Injectable } from '@angular/core';
import { AxiomaimMockApiService, AxiomaimMockApiUtils } from '@axiomaim/lib/mock-api';
import { billingCyle } from 'app/mock-api/common/billing-cycle/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class BillingCycleMockApi {
    private _billingCycle: any = billingCyle;

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
        // @ BillingCycle - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/common/billing-cycles')
            .reply(() => [200, cloneDeep(this._billingCycle)]);

        // -----------------------------------------------------------------------------------------------------
        // @ BillingCycle - POST
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPost('api/common/billing-cycles')
            .reply(({ request }) => {
                // Get the message
                const newMessage = cloneDeep(request.body.message);

                // Generate a new GUID
                newMessage.id = AxiomaimMockApiUtils.guid();

                // Unshift the new message
                this._billingCycle.unshift(newMessage);

                // Return the response
                return [200, newMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ BillingCycle - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPatch('api/common/billing-cycles')
            .reply(({ request }) => {
                // Get the id and message
                const id = request.body.id;
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._billingCycle.forEach(
                    (item: any, index: number, messages: any[]) => {
                        if (item.id === id) {
                            // Update the message
                            messages[index] = assign(
                                {},
                                messages[index],
                                message
                            );

                            // Store the updated message
                            updatedMessage = messages[index];
                        }
                    }
                );

                // Return the response
                return [200, updatedMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ BillingCycle - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onDelete('api/common/billing-cycles')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Prepare the deleted message
                let deletedMessage = null;

                // Find the message
                const index = this._billingCycle.findIndex(
                    (item: any) => item.id === id
                );

                // Store the deleted message
                deletedMessage = cloneDeep(this._billingCycle[index]);

                // Delete the message
                this._billingCycle.splice(index, 1);

                // Return the response
                return [200, deletedMessage];
            });

    }
}
