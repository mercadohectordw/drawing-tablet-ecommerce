import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User = new User;
  orders: Order[] = new Array<Order>;

  constructor(private userService:UserService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: async(res:User) => {
          this.user = res;
          
          if(token) await this.getOrders(token);
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  getOrders(token:string): void{
    this.orderService.getUserOrders(token).subscribe({
      next: (res: Order[]) => {
        this.orders = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
