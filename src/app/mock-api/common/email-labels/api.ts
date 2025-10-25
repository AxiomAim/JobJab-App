import { Injectable } from '@angular/core';
import { AxiomaimMockApiService, AxiomaimMockApiUtils } from '@axiomaim/lib/mock-api';
import { EmailLabel } from 'app/core/models/email-labels.model ';
import { UserRole } from 'app/core/models/user-roles.model';
import { emailLabels as emailLabelsData } from 'app/mock-api/common/email-labels/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class EmailLabelsMockApi {
    private _emailLabels: EmailLabel[] = emailLabelsData;

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
        // @ Messages - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/common/email-labels')
            .reply(() => [200, cloneDeep(this._emailLabels)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - POST
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPost('api/common/email-labels')
            .reply(({ request }) => {
                // Get the message
                const newMessage = cloneDeep(request.body.message);

                // Generate a new GUID
                newMessage.id = AxiomaimMockApiUtils.guid();

                // Unshift the new message
                this._emailLabels.unshift(newMessage);

                // Return the response
                return [200, newMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPatch('api/common/email-labels')
            .reply(({ request }) => {
                // Get the id and message
                const id = request.body.id;
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._emailLabels.forEach(
                    (item: any, index: number, modules: any[]) => {
                        if (item.id === id) {
                            // Update the message
                            modules[index] = assign(
                                {},
                                modules[index],
                                message
                            );

                            // Store the updated message
                            updatedMessage = modules[index];
                        }
                    }
                );

                // Return the response
                return [200, updatedMessage];
            });


    }
}
