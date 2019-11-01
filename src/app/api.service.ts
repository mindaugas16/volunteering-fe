import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path, params?, responseType?, headers?): Observable<any> {
    return this.request('GET', path, params, null, headers, responseType);
  }

  post(path, body, params?, headers?): Observable<any> {
    return this.request('POST', path, params, body);
  }

  put(path, body, params?): Observable<any> {
    return this.request('PUT', path, params, body);
  }

  delete(path, body, params?): Observable<any> {
    return this.request('DELETE', path, params, body);
  }

  patch(path, body, params?): Observable<any> {
    return this.request('PATCH', path, params, body);
  }

  private request(method, path, params?, body?, headers?, responseType?) {
    return this.http
      .request(method, environment.api + path, { params, body, headers, responseType })
      .pipe(
        map(
          res => {
            return res;
          },
          err => {
            this.handleError(err);
            return err;
          }
        )
      );
  }

  private handleError(error) {
    console.log(error);
    /* Error handling is supposed to be here */
    return error;
  }

  // @TODO: remove query function after refactore
  query(body: { query: string; variables?: Object }): Observable<any> {
    return this.http.post(environment.api, body);
  }

  upload(body: FormData) {
    return this.http.post(`${environment.apiRest}upload`, body);
  }
}
