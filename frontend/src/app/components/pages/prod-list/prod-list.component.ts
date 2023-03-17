import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  sortby = ["Price: Low to High", "Price: High to Low"];
  sort: FormGroup;
  path = "";

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router:Router) {
    this.sort = formBuilder.group({
      by: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    switch(window.location.pathname){
      case "/pen-tablets": 
        this.categoryId = 1;
        this.path = "Pen Tablets";
        break;
      case "/pen-displays": 
        this.categoryId = 2;
        this.path = "Pen Displays";
        break;
      case "/accessories": 
        this.categoryId = 3;
        this.path = "Accessories";
        break;
    }

    if(this.categoryId != null){
      this.productService.getProductsByCategory(this.categoryId)
        .subscribe((res:any) => {
          this.productList = res;
        });
    } else {
      this.router.navigateByUrl("/page-not-found");
    }
  }

  submitSort(): void{
    if(this.sort.valid){
      if(this.sort.get("by")?.value == "Price: Low to High"){
        this.productList.sort((prodA: Product, prodB: Product) => prodA.price - prodB.price);
      }
      if(this.sort.get("by")?.value == "Price: High to Low"){
        this.productList.sort((prodA: Product, prodB: Product) => prodA.price + prodB.price);
      }
    }
  }
}
