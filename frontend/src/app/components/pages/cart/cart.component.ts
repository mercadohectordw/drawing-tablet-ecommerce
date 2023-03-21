import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  token!: string;
  cart = new Cart;
  totalPrice: number = 0;
  quantitys = [1, 2, 3, 4, 5];

  constructor(private cartService: CartService, private userService: UserService, private router: Router) {  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token) this.getCart(token);
  }

  getCart(token:string): void{
    this.cartService.getUserCart(token).subscribe({
      next: (res:Cart) => {
        if(token) this.token = token;
        this.totalPrice = 0;
        this.cart = res;

        for(let p of this.cart.cart_items){
          this.totalPrice += p.product_price * p.quantity;
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
  }

  changeQuantity(cart_item_id:number, quantity:number): void{
    this.cartService.updateCartItem(this.token, cart_item_id, {"quantity": quantity}).subscribe({
      next: (res:any) => {
        this.getCart(this.token);
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  deleteCartItem(cart_item_id:number): void{
    this.cartService.deleteCartItem(this.token, cart_item_id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
}
