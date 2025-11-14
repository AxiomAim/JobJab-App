import { Injectable } from '@angular/core';
import { AxiomaimMockApiService, AxiomaimMockApiUtils } from '@axiomaim/lib/mock-api';
import { stages as stagesData } from 'app/mock-api/setup/stages/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class StagesMockApi {
    private _stages: any = stagesData;

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
        // @ Shortcuts - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/setup/stages')
            .reply(() => [200, cloneDeep(this._stages)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Shortcuts - POST
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPost('api/setup/stages')
            .reply(({ request }) => {
                // Get the shortcut
                const newShortcut = cloneDeep(request.body.shortcut);

                // Generate a new GUID
                newShortcut.id = AxiomaimMockApiUtils.guid();

                // Unshift the new shortcut
                this._stages.unshift(newShortcut);

                // Return the response
                return [200, newShortcut];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Shortcuts - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPatch('api/setup/stages')
            .reply(({ request }) => {
                // Get the id and shortcut
                const id = request.body.id;
                const shortcut = cloneDeep(request.body.shortcut);

                // Prepare the updated shortcut
                let updatedShortcut = null;

                // Find the shortcut and update it
                this._stages.forEach(
                    (item: any, index: number, stages: any[]) => {
                        if (item.id === id) {
                            // Update the shortcut
                            stages[index] = assign(
                                {},
                                stages[index],
                                shortcut
                            );

                            // Store the updated shortcut
                            updatedShortcut = stages[index];
                        }
                    }
                );

                // Return the response
                return [200, updatedShortcut];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Shortcuts - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onDelete('api/setup/stages')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');

                // Prepare the deleted shortcut
                let deletedShortcut = null;

                // Find the shortcut
                const index = this._stages.findIndex(
                    (item: any) => item.id === id
                );

                // Store the deleted shortcut
                deletedShortcut = cloneDeep(this._stages[index]);

                // Delete the shortcut
                this._stages.splice(index, 1);

                // Return the response
                return [200, deletedShortcut];
            });
    }
}
