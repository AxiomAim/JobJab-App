import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    EnvironmentProviders,
    Provider,
    importProvidersFrom,
    inject,
    provideAppInitializer,
    provideEnvironmentInitializer,
} from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    AXIOMAIM_MOCK_API_DEFAULT_DELAY,
    mockApiInterceptor,
} from '@axiomaim/lib/mock-api';
import { AxiomaimConfig } from '@axiomaim/services/config';
import { AXIOMAIM_CONFIG } from '@axiomaim/services/config/config.constants';
import { AxiomaimConfirmationService } from '@axiomaim/services/confirmation';
import {
    AxiomaimLoadingService,
    axiomaimLoadingInterceptor,
} from '@axiomaim/services/loading';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { AxiomaimPlatformService } from '@axiomaim/services/platform';
import { AxiomaimSplashScreenService } from '@axiomaim/services/splash-screen';
import { AxiomaimUtilsService } from '@axiomaim/services/utils';

export type AxiomaimProviderConfig = {
    mockApi?: {
        delay?: number;
        service?: any;
    };
    axiomaim?: AxiomaimConfig;
};

/**
 * Axiomaim provider
 */
export const provideAxiomaim = (
    config: AxiomaimProviderConfig
): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: AXIOMAIM_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide: AXIOMAIM_CONFIG,
            useValue: config?.axiomaim ?? {},
        },

        importProvidersFrom(MatDialogModule),
        provideEnvironmentInitializer(() => inject(AxiomaimConfirmationService)),

        provideHttpClient(withInterceptors([axiomaimLoadingInterceptor])),
        provideEnvironmentInitializer(() => inject(AxiomaimLoadingService)),

        provideEnvironmentInitializer(() => inject(AxiomaimMediaWatcherService)),
        provideEnvironmentInitializer(() => inject(AxiomaimPlatformService)),
        provideEnvironmentInitializer(() => inject(AxiomaimSplashScreenService)),
        provideEnvironmentInitializer(() => inject(AxiomaimUtilsService)),
    ];

    // Mock Api services
    if (config?.mockApi?.service) {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            provideAppInitializer(() => {
                const mockApiService = inject(config.mockApi.service);
            })
        );
    }

    // Return the providers
    return providers;
};
