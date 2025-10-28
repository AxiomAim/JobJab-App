import { inject, Injectable } from '@angular/core';
import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
// import { user as userData } from 'app/mock-api/common/user/data';
import { User } from 'app/modules/axiomaim/administration/users/users.model';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class UserMockApi {
    private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    private _user: User;

    /**
     * Constructor
     */
    constructor(private _axiomaimMockApiService: AxiomaimMockApiService) {
        this._firebaseAuthV2Service.loadFromStorage();
        this._user = this._firebaseAuthV2Service.loginUser();
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
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);

        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._axiomaimMockApiService
            .onPatch('api/common/user')
            .reply(({ request }) => {
                // Get the user mock-api
                const user = cloneDeep(request.body.user);

                // Update the user mock-api
                this._user = assign({}, this._user, user);

                // Return the response
                return [200, cloneDeep(this._user)];
            });
    }
}
