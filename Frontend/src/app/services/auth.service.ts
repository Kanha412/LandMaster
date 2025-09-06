import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { ROLE_KEY, TOKEN_KEY, USERID_KEY } from '../constants';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = environment.apiUrl;

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/api/register", user);
  }

  login(login: Login): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/api/login", login)
      .pipe(
        tap(
          response => {
            if (response && response.token) {
              const tokenPart = response.token.split('.');
              let payload = JSON.parse(atob(tokenPart[1]));

              localStorage.setItem(ROLE_KEY, payload.role);
              localStorage.setItem(TOKEN_KEY, JSON.stringify(response.token));
              localStorage.setItem(USERID_KEY, payload.nameid);
            }
          }
        )
      );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(ROLE_KEY) != null;
  }

  isAdmin(): boolean {
    return localStorage.getItem(ROLE_KEY) === 'Admin';
  }

  isUser(): boolean {
    return localStorage.getItem(ROLE_KEY) === 'User';
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? JSON.parse(token) : null;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(USERID_KEY);
    return userId ? parseInt(userId) : null;
  }
}
