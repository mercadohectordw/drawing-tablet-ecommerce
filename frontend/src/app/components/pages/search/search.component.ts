import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productList!: Product[];
  query!: string;
  sortby = ["Price: Low to High", "Price: High to Low", "Best Sellers"];
  sort: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
    this.sort = formBuilder.group({
      by: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.query = queryParams['q'];
      this.productService.getProductsBySearch(this.query).subscribe({
        next: (res:any) => {
          this.productList = res;
        },
        error: (err:any) => {
          console.log(err);
        }
      });
    });
  }

  submitSort(): void{
    if(this.sort.valid){
      if(this.sort.get("by")?.value == "Price: Low to High"){
        this.productList.sort((prodA: Product, prodB: Product) => prodA.price - prodB.price);
      }
      if(this.sort.get("by")?.value == "Price: High to Low"){
        this.productList.sort((prodA: Product, prodB: Product) => prodB.price - prodA.price);
      }
      if(this.sort.get("by")?.value == "Best Sellers"){
        this.productList.sort((prodA: Product, prodB: Product) => prodB.sales - prodA.sales);
      }
    }
  }
}
