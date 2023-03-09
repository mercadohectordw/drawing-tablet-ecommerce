import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  categoryId?: number;
  productList!: Product[];

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    switch(window.location.pathname){
      case "/pen-tablets": 
        this.categoryId = 1;
        break;
      case "/pen-displays": 
        this.categoryId = 2;
        break;
      case "/accessories": 
        this.categoryId = 3;
        break;
    }

    if(this.categoryId != null){
      this.productService.getProductsByCategory(this.categoryId)
        .subscribe((res:any) => {
          this.productList = res;
          console.log(this.productList);
        });
    } else {
      this.router.navigateByUrl("/page-not-found");
    }
  }
}
