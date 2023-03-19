import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getBestSellers(): Observable<any>{
    return this.http.get<any>(this.api + 'products/best');
  }

  getProductsByCategory(categoryId: number): Observable<any>{
    return this.http.get<any>(this.api + 'products/category/' + categoryId);
  }

  getProductsBySearch(search: string): Observable<any>{
    return this.http.get<any>(this.api + 'products/search/' + search);
  }

  getProduct(productId: number): Observable<any>{
    return this.http.get<any>(this.api + 'products/' + productId);
  }

  getProductForAdmin(token:string, productId: number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.get<any>(this.api + 'products/admin/' + productId, httpOptions);
  }

  getAllProducts(token: string): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.get<any>(this.api + 'products/', httpOptions);
  }

  createProduct(token: string, body:any): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.post<any>(this.api + 'products/', body, httpOptions);
  }

  updateProduct(token: string, body:any, product_id:number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.put<any>(this.api + 'products/' + product_id, body, httpOptions);
  }

  deleteProduct(token: string, product_id: number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.delete<any>(this.api + 'products/' + product_id, httpOptions);
  }

  changeProductVisibility(token: string, product_id: number, visibility: number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.put<any>(this.api + 'products/visibility/' + product_id, {active: visibility}, httpOptions);
  }
  
  postSecundaryImage(token: string, product_id: number, img: string): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.post<any>(this.api + 'products/image/' + product_id, {url:img}, httpOptions);
  }

  deleteSecundaryImage(token: string, image_id: number): Observable<any>{
    let httpOptions = this.generateHeader(token);

    return this.http.delete<any>(this.api + 'products/image/' + image_id, httpOptions);
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
