import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  query(body: { query: string, variables?: Object }): Observable<any> {
    return this.http.post(environment.api, body);
  }

  upload(body: FormData) {
    return this.http.post(`${environment.apiRest}upload`, body);
  }
}
