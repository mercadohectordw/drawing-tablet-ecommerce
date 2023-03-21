import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {

  token!: string;
  product: Product = new Product;
  errorDeleteMessage = "";
  editProduct: FormGroup;
  newSecImage: FormGroup;
  errorMessage!: string;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute , private router: Router) {
    this.editProduct = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      main_image: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      inventory: new FormControl('', Validators.required)
    });

    this.newSecImage = this.formBuilder.group({
      url: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let product_id = this.route.snapshot.params['product_id'];
    
    if(token) {
      this.productService.getProductForAdmin(token, product_id).subscribe({
        next: (res:Product) => {
          if(token){
            this.token = token;
            this.product = res;

            this.editProduct.get("name")?.setValue(res.name);
            this.editProduct.get("description")?.setValue(res.description);
            this.editProduct.get("price")?.setValue(res.price);
            this.editProduct.get("main_image")?.setValue(res.main_image);
            this.editProduct.get("category_id")?.setValue(res.category!="Pen Tablet" ? (res.category=="Pen Display" ? 2 : 3 ): 1);
            this.editProduct.get("inventory")?.setValue(res.inventory);
          }
        },
        error: (err:any) => {
          if(err.error.message == "User UnAuthorized"){
            this.router.navigateByUrl("/home");
            return;
          }
          if(err.error.message == "Invalid Token"){
            localStorage.removeItem("token");
            this.router.navigateByUrl("/home");
            return;
          }
          console.log(err);
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  toggleModal(): void{
    let modal = document.getElementById("modalCreateNew");
    if(modal){
      modal.style.display == 'none'
        ? modal.style.display = 'flex'
        : modal.style.display = 'none';
    }
  }

  submitForm(): void{
    if(this.editProduct.invalid){
      this.errorMessage = "Check your Data";
      return;
    }

    let body = {
      name: this.editProduct.get("name")?.value,
      description: this.editProduct.get("description")?.value,
      price: this.editProduct.get("price")?.value,
      main_image: this.editProduct.get("main_image")?.value,
      category_id: this.editProduct.get("category_id")?.value,
      inventory: this.editProduct.get("inventory")?.value
    };

    if(this.product.id)
    this.productService.updateProduct(this.token, body, this.product.id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        if(err.error.message == "Data error"){
          this.errorMessage = "Check your Data";
          return;
        }
        console.log(err);
      }
    });
  }

  changeVisibility(visibility: number): void{
    if(this.product.id)
    this.productService.changeProductVisibility(this.token, this.product.id, visibility).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  addImage(): void{
    if(this.product.id && this.newSecImage.valid)
    this.productService.postSecundaryImage(this.token, this.product.id, this.newSecImage.get("url")?.value).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
  
  toggleModalConfirmDelete(): void{
    let modalConfirmDelete = document.getElementById("modalConfirmDelete");

    if(modalConfirmDelete){
      modalConfirmDelete.style.display == "none"
        ? modalConfirmDelete.style.display = "flex"
        : modalConfirmDelete.style.display = "none";
    }
  }

  deleteImage(id:number): void{
    this.productService.deleteSecundaryImage(this.token, id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  deleteProduct(): void{
    if(this.product.id)
    this.productService.deleteProduct(this.token, this.product.id).subscribe({
      next: (res:any) => {
        this.router.navigateByUrl("/admin/products");
      },
      error: (err:any) => {
        if(err.error.message = "The product has sales"){
          this.errorDeleteMessage = "The product has sales, it can't be deleted";
          setTimeout(() => {
            this.errorDeleteMessage = "";
          }, 5000);
        }
        console.log(err);
      }
    });
  }
}
