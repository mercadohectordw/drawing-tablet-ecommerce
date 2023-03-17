import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private api = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  postCartItem(token: string, product_id: number): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
    return this.http.post<any>(this.api + "carts/items/" + product_id, {}, httpOptions);
  }

  getUserCart(token: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
    return this.http.get<any>(this.api + "carts/", httpOptions);
  }

  updateCartItem(token: string, cart_item_id: number, data: any): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
    return this.http.put<any>(this.api + "carts/items/" + cart_item_id, data, httpOptions);
  }

  deleteCartItem(token: string, cart_item_id: number): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
    return this.http.delete<any>(this.api + "carts/items/" + cart_item_id, httpOptions);
  }
}