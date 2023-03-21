import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  token!: string; 
  orders!: Order[]; 
  numPages!: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams['p']){
        let page = queryParams['p'];
        this.getOrders(token, page);
      } else {
        this.router.navigate(["/admin/orders/"],{queryParams: {p:1}});
      }
    });
  }

  getOrders(token:any, page:number = 0): void{
    if(token){
      this.orderService.getAllOrders(token, page).subscribe({
        next: (res:any) => {
          if(token){
            this.token = token;
            this.numPages = res.pages;
            this.orders = res.rows;
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
}
