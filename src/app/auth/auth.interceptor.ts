import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { forwardRef, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HeaderMessageService } from '../ui-elements/header-message/header-message.service';

export const AUTH_HEADER_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => AuthInterceptor),
  multi: true
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public injector: Injector,
              private router: Router,
              private headerMessageService: HeaderMessageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService: AuthService = this.injector.get(AuthService);
    if (authService.isAuthenticated()) {
      const token = AuthService.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(_ => {
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.error.errors && error.error.errors[0].status === 401) {
            authService.logout();
            this.headerMessageService.show('Please login!', 'WARNING');
          }
        }
      }));
  }
}
