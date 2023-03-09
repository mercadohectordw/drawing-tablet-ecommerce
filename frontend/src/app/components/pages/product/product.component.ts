import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProduct(this.route.snapshot.params['product_id'])
      .subscribe({
        next: (res:any) => {
          this.product = res;
          console.log(this.product);
        },
        error: (err:any) => {
          console.log(err);
          this.router.navigateByUrl("/page-not-found");
        }
      });
  }

}
