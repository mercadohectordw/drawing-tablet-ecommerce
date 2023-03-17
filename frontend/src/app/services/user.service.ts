import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl;

  constructor(private http:HttpClient) { }

  register(user:User): Observable<any> {
    return this.http.post<any>(this.api + 'users/register/', user);
  }

  login(user:User): Observable<any>{
    return this.http.post<any>(this.api + 'users/login/', user);
  }

  getUser(token:string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };

    return this.http.get<any>(this.api + 'users/profile/', httpOptions);
  }

  updateUser(token:string, userData:any): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };

    return this.http.put<any>(this.api + 'users/update', userData, httpOptions);
  }

  updateUserPassword(token:string, newPassword:any): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };

    return this.http.put<any>(this.api + 'users/update/password', newPassword, httpOptions);
  }
}
