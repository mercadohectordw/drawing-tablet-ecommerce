import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() product_id!: number;

  constructor(private cartService: CartService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addProductToCart(): void{
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: async(res:any) => {

          if(token && this.product_id) {
            this.cartService.postCartItem(token, this.product_id).subscribe({
              next: (res:any) => {
                window.location.href = "/cart";
              },
              error: (err:any) => {
                if( err.error.message == "The product is already in your cart"){
                  window.location.href = "/cart";
                }
                console.log(err);
              }
            });
          }

        },
        error: (err:any) => {
          localStorage.removeItem("token");
          this.router.navigateByUrl("/login");
        }
      });
    }
  }
}
