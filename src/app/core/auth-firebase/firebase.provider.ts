import { EnvironmentProviders, Provider } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirestoreCRUDService } from './firestore_crud.service';
// import { AppSettings } from 'app/app.settings';
// import { AppService } from 'app/app.service';

export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [];
};
