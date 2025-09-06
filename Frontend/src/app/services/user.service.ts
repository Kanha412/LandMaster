import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './environment';
 
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { }
  private apiUrl=environment.apiUrl;
 
  getallUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/users');
  }
 
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/id/${id}`);
  }
 
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/email/${email}`);
  }
 
}
 
 