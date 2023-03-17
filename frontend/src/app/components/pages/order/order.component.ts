import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order = new Order;

  constructor(private orderService: OrderService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: async(res:User) => {
          let order = this.route.snapshot.params['order_id'];
          if(token) await this.getOrder(token, order);
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  getOrder(token: string, order_id: number): void{
    this.orderService.getOrder(token, order_id).subscribe({
      next: (res) => {
        this.order = res;
      },
      error: (err) => {
        console.log(err);
        this.router.navigateByUrl("/profile");
      }
    });
  }
}
