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

// export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
//     return [
//         provideFirebaseApp(() => initializeApp(environment.firebase)),
//         provideFirestore(() => getFirestore()),
//         provideStorage(() => getStorage()),
//         provideAnalytics(() => getAnalytics()),
//         provideFunctions(() => getFunctions()),
//         provideAuth(() => getAuth()),
//         {
//             provide: APP_INITIALIZER,
//             useFactory: () => {
//                 const authService = inject(FirebaseAuthV2Service);
//                 return () => authService.initializeAuth('your-id'); // Assuming you have an initializeAuth method
//             },
//             multi: true,
//         },
  
//     ];
// };

export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
    ];
};

