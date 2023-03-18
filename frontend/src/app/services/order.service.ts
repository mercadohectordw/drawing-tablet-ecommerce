import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getUserOrders(token:string): Observable<any> {
    let httpOptions = this.generateHeader(token);

    return this.http.get<any>(this.api + "orders/user/", httpOptions);
  }

  getOrderForAdmin(token:string, order_id:number): Observable<any>{
    let httpOptions = this.generateHeader(token);
    
    return this.http.get<any>(this.api + "orders/admin/" + order_id, httpOptions);
  }

  getOrder(token:string, order_id:number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.get<any>(this.api + "orders/user/" + order_id, httpOptions);
  }

  submitOrder(token:string, body:any): Observable<any>{
    let httpOptions = this.generateHeader(token);
    
    return this.http.post<any>(this.api + 'orders/user/', body, httpOptions);
  }

  getAllOrders(token:string, page:number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.get<any>(this.api + 'orders/admin/all/' + page, httpOptions);
  }


  putOrderAsShipped(token:string, order_id:number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.put<any>(this.api + 'orders/admin/' + order_id, {}, httpOptions);
  }

  deleteOrder(token:string, order_id:number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.delete<any>(this.api + 'orders/admin/' + order_id, httpOptions);
  }

  generateHeader(token:string): any{
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        authorization: 'Bearer ' + token
      })
    };
  }
}