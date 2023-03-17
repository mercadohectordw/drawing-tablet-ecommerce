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

  product = new Product;
  images = new Array;
  imageInView = "";
  path: any = {};

  constructor(private productService: ProductService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProduct(this.route.snapshot.params['product_id'])
      .subscribe({
        next: (res:Product) => {
          this.product = res;
          this.imageInView = this.product.main_image;
          this.images = [{id:0, url:this.product.main_image}];
          if(this.product.images){
            this.images = this.images.concat(this.product.images);
          }

          switch(this.product.category){
            case "Pen Tablet":
              this.path = {
                name: "Pen Tablets",
                url: "/pen-tablets"
              };
              break;
            case "Pen Display":
              this.path = {
                name: "Pen Displays",
                url: "/pen-displays"
              };
              break;
            case "Accessory":
              this.path = {
                name: "Accessories",
                url: "/accessories"
              };
              break;
            default: break;
          }
        },
        error: (err:any) => {
          console.log(err);
          this.router.navigateByUrl("/page-not-found");
        }
      });
  }

  newImageInView(pos: number): void{
    this.imageInView = this.images[pos].url;
  }


}
