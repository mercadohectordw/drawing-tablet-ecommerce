import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getProductsByCategory(categoryId: number): Observable<any>{
    return this.http.get<any>(this.api + 'products/category/' + categoryId);
  }

  getProductsBySearch(search: string): Observable<any>{
    return this.http.get<any>(this.api + 'products/search/' + search);
  }

  getProduct(productId: number): Observable<any>{
    return this.http.get<any>(this.api + 'products/' + productId);
  }

}
