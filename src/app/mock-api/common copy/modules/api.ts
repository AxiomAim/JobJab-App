import { Injectable } from '@angular/core';
import { AxiomaimMockApiService, AxiomaimMockApiUtils } from '@axiomaim/lib/mock-api';
import { modules as modulesData } from 'app/mock-api/common/modules/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class MessagesMockApi {
    private _modules: any = modulesData;

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
            .onGet('api/common/modules')
            .reply(() => [200, cloneDeep(this._modules)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - POST
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPost('api/common/modules')
            .reply(({ request }) => {
                // Get the message
                const newMessage = cloneDeep(request.body.message);

                // Generate a new GUID
                newMessage.id = AxiomaimMockApiUtils.guid();

                // Unshift the new message
                this._modules.unshift(newMessage);

                // Return the response
                return [200, newMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPatch('api/common/modules')
            .reply(({ request }) => {
                // Get the id and message
                const id = request.body.id;
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._modules.forEach(
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

        // -----------------------------------------------------------------------------------------------------
        // @ Messages - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onDelete('api/common/modules')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Prepare the deleted message
                let deletedMessage = null;

                // Find the message
                const index = this._modules.findIndex(
                    (item: any) => item.id === id
                );

                // Store the deleted message
                deletedMessage = cloneDeep(this._modules[index]);

                // Delete the message
                this._modules.splice(index, 1);

                // Return the response
                return [200, deletedMessage];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Mark all as read - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/common/modules/mark-all-as-read')
            .reply(() => {
                // Go through all modules
                this._modules.forEach(
                    (item: any, index: number, modules: any[]) => {
                        // Mark it as read
                        modules[index].read = true;
                        modules[index].seen = true;
                    }
                );

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Toggle read status - POST
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPost('api/common/modules/toggle-read-status')
            .reply(({ request }) => {
                // Get the message
                const message = cloneDeep(request.body.message);

                // Prepare the updated message
                let updatedMessage = null;

                // Find the message and update it
                this._modules.forEach(
                    (item: any, index: number, modules: any[]) => {
                        if (item.id === message.id) {
                            // Update the message
                            modules[index].read = message.read;

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
