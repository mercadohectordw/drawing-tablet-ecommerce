import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  shippingAddress: FormGroup;
  cart = new Cart;
  totalPrice: number = 0;
  token!: string;
  errorMessage = "";
  done = false;
  step = 1;

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private orderService: OrderService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.shippingAddress = this.formBuilder.group({
      address_line: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: async(res:User) => {
          if(token) {
            this.token = token;
            await this.getUserCart(token);
          }
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  getUserCart(token:string): void {
    this.cartService.getUserCart(token).subscribe({
      next: (res:Cart) => {
        this.totalPrice = 0;
        this.cart = res;

        for(let p of this.cart.cart_items){
          this.totalPrice += p.product_price * p.quantity;
        }
      },
      error: (err:any) => {
        this.router.navigateByUrl("/cart");
        console.log(err);
      }
    });
  }

  submitForm1(): void{
    if(this.validateShippingAddressForm()){
      this.step = 2;
    }
  }

  submitForm2(): void{
    this.step = 3;
  }

  validateShippingAddressForm(): boolean{
    if(this.shippingAddress.invalid){
      this.errorMessage = "Check your data";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return false;
    }
    return true;
  }

  submitOrder(): void{
    if(!this.validateShippingAddressForm()){
      return;
    }

    let body = {
      cart_id: this.cart.id,
      shipping_address: {
        address_line: this.shippingAddress.get("address_line")?.value,
        city: this.shippingAddress.get("city")?.value,
        province: this.shippingAddress.get("province")?.value,
        country: this.shippingAddress.get("country")?.value,
        postal_code: this.shippingAddress.get("postal_code")?.value,
        mobile: this.shippingAddress.get("mobile")?.value
      }
    };

    this.orderService.submitOrder(this.token, body).subscribe({
      next: (res:any) => {
        this.done = true;
        window.location.href = "/profile";
      },
      error: (err:any) => {
        if(err.error.message.includes("enough stock")){
          this.errorMessage = err.error.message;
        }
        console.log(err);
      }
    });
  }
}
