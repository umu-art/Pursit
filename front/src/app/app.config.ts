import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApiModule as CoreApiModule, BASE_PATH as CORE_BASE_PATH} from '../../api-core-ts';
import {ApiModule as MediaApiModule, BASE_PATH as MEDIA_BASE_PATH} from '../../api-media-ts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(CoreApiModule),
    importProvidersFrom(MediaApiModule),
    {provide: CORE_BASE_PATH, useValue: window.location.origin},
    {provide: MEDIA_BASE_PATH, useValue: window.location.origin},
  ]
};
