import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import {appRoutes} from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(appRoutes), provideClientHydration(), provideStore(), provideHttpClient(),importProvidersFrom(BrowserAnimationsModule)],
};
