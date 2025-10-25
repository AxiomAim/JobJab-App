import {
    APP_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
//Angularfire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'environments/environment';

export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
    ];
};

