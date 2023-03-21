import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  token!: string; 
  products!: Product[];
  registerProduct: FormGroup;
  errorMessage = "";

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.registerProduct = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      main_image: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      inventory: new FormControl('', Validators.required),
      images: this.formBuilder.array([
        new FormControl('')
      ])
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.productService.getAllProducts(token).subscribe({
        next: (res:any) => {
          if(token) this.token = token;
          this.products = res;
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

  get images(){
    return this.registerProduct.get('images') as FormArray;
  }

  addImage(): void{
    this.images.push(new FormControl(''));
  }

  submitForm(): void{
    if(this.registerProduct.invalid){
      this.errorMessage = "Check your Data";
      return;
    }

    let body = {
      name: this.registerProduct.get("name")?.value,
      description: this.registerProduct.get("description")?.value,
      price: this.registerProduct.get("price")?.value,
      main_image: this.registerProduct.get("main_image")?.value,
      category_id: this.registerProduct.get("category_id")?.value,
      inventory: this.registerProduct.get("inventory")?.value,
      images: this.images.value
    };

    
    this.productService.createProduct(this.token, body).subscribe({
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
}
