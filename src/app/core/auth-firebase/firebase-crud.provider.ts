// import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    importProvidersFrom,
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
// import { FirestoreService } from './firestore.service';
import { FirestoreCRUDService } from './firestore_crud.service';
// import { AppSettings } from 'app/app.settings';
// import { AppService } from 'app/app.service';

export const firebaseCRUDProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FirestoreCRUDService),
            multi: true,
        },
    ];
    // return [
    //     importProvidersFrom([
    //         FirestoreService,
    //         UserDataService,
    //         // AppSettings,
    //         // AppService
    //     ]),        
    // ];
};
