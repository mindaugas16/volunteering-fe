import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AUTH_HEADER_INTERCEPTOR_PROVIDER } from './auth/auth.interceptor';
import { ApiService } from './api.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ERRORS_INTERCEPTOR } from './core/services/error/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderMessageModule } from './ui-elements/header-message/header-message.module';
import { ACCEPT_LANGUAGE_HEADER_INTERCEPTOR_PROVIDER } from './ui-elements/language-switch/services/accept-language.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
    HeaderMessageModule
  ],
  providers: [
    AUTH_HEADER_INTERCEPTOR_PROVIDER,
    ERRORS_INTERCEPTOR,
    ApiService,
    ACCEPT_LANGUAGE_HEADER_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
