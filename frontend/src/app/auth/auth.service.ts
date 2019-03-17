import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const LOCAL_STORAGE_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apollo: Apollo,
              private router: Router) {
    this.authenticated$.next(this.isAuthenticated());
  }

  static getToken() {
    const user = AuthService.getUser();
    return user ? user.token : null;
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || null;
  }

  signIn(email: string, password: string): Observable<any> {
    const setSession = (authResponse) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(
        {
          'token': authResponse.login.token,
          'email': authResponse.login.email
          // 'expiresAt': expiresAt.valueOf()
        }
      ));
    };
    return this.apollo.query({
      query: gql`
        query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              tokenExpiration
              email
            }
           }
      `,
      variables: {
        email: email,
        password: password
      }
    }).pipe(
      map(({data}) => data),
      tap(res => {
        setSession(res);
        this.authenticated(true);
        this.router.navigate(['/']);
      })
    );
  }

  private authenticated(authenticated: boolean) {
    this.authenticated$.next(authenticated);
  }

  authenticatedObservable(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  public logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.authenticated(false);
    this.router.navigate(['/auth/sign-in']);
  }

  public isAuthenticated() {
    return !!AuthService.getToken();
  }
}
