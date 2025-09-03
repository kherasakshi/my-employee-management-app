import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { SharedModule } from './shared-components/shared.module';


import { ChartsModule } from './employee-portal/employee-bie-charts/employee-charts.module';

import { SettingsModule } from './employee-portal/setting-page/setting-page.module';
import { AppRoutingModule } from './app-routing-module';
import { PageNotFoundComponent } from './employee-portal/Page-not-found/page-not-found.component';
import { EmployeeModule } from './employee-portal/employee/employee.module';
import { AuthModule } from './employee-portal/main-navbar/main-navbar.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    EmployeeModule,
    ChartsModule,
    AuthModule,
    SettingsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const storedLang = localStorage.getItem('lang');
    translate.use(
      storedLang && translate.getLangs().includes(storedLang)
        ? storedLang
        : 'en'
    );
  }
}
