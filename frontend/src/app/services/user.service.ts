import { HttpClient } from '@angular/common/http';
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

  register(user:User): Observable<string> {
    return this.http.post<string>(this.api + 'users/register/', user);
  }

  login(user:User): Observable<string>{
    return this.http.post<any>(this.api + 'users/login/', user);
  }
}
