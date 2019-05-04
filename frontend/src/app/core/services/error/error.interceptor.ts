import { forwardRef, Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../../../auth/auth.service';

export const ERRORS_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => ErrorInterceptor),
  multi: true
};

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          const errors = res.body.errors;
          if (errors && errors.length) {
            const [error] = errors;
            if (error.status === 401) {
              this.authService.logout();
            }
            throw error;
          }
        }
      })
    );
  }
}
