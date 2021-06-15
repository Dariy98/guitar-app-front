import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LOCATION_INITIALIZED} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BehaviorSubject} from 'rxjs';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationModule} from './components/registration/registration.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import {HomeModule} from './components/home/home.module';
import {HeaderModule} from './components/layout/header/header.module';
import {LoginModule} from './components/login/login.module';
import {FooterModule} from './components/layout/footer/footer.module';


export function HttpLoaderFactory(http: HttpClient) {
  return (new TranslateHttpLoader(http, './assets/i18n/', '.json'));
}

export const LANGUAGE = new BehaviorSubject<any>(localStorage.getItem('lang'));

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const systemLanguage = window.navigator.language.substr(0, 2);
      const langToSet = systemLanguage;
      LANGUAGE.subscribe((lang) => {
        if (lang) {
          translate.use(lang).subscribe();
        }
      });
      // const langToSet = 'en';
      translate.setDefaultLang(systemLanguage);
      translate.use(langToSet).subscribe(
        () => {
          console.log(`Successfully initialized this - '${langToSet}' language.`);
        },
        (err) => {
          console.error(`Error with '${langToSet}' language initialization.`);
        },
        () => {
          resolve(null);
        });
    }).catch(err => {
      console.error(err);
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    HomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    HeaderModule,
    LoginModule,
    FooterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
