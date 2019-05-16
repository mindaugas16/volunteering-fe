import { forwardRef, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export const ACCEPT_LANGUAGE_HEADER_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => AcceptLanguageInterceptor),
  multi: true
};

@Injectable({
  providedIn: 'root'
})
export class AcceptLanguageInterceptor implements HttpInterceptor {

  constructor(private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = this.translateService.currentLang || this.translateService.defaultLang;
    request = request.clone({
      setHeaders: {
        'Accept-Language': `${language}`
      }
    });
    return next.handle(request);
  }
}
