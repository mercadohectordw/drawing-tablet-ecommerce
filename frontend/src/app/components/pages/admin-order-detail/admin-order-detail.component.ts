import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {

  token!: string;
  order: Order = new Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let order_id = this.route.snapshot.params['order_id'];
    
    if(token) {
      this.orderService.getOrderForAdmin(token, order_id).subscribe({
        next: (res:Order) => {
          if(token){
            this.token = token;
            this.order = res;
          }
        },
        error: (err:any) => {
          if(err.error.message = "User UnAuthorized"){
            this.router.navigateByUrl("/home");
            return;
          }
          if(err.error.message = "Invalid Token"){
            localStorage.removeItem("token");
            this.router.navigateByUrl("/home");
          }
          console.log(err);
        }
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  toggleModalConfirmDelete(): void{
    let modalConfirmDelete = document.getElementById("modalConfirmDelete");

    if(modalConfirmDelete){
      modalConfirmDelete.style.display == "none"
        ? modalConfirmDelete.style.display = "flex"
        : modalConfirmDelete.style.display = "none";
    }
  }

  deleteOrder(): void{
    this.orderService.deleteOrder(this.token, this.order.id).subscribe({
      next: (res:any) => {
        this.router.navigateByUrl("/admin/orders");
      },
      error: (err:any) => {
        console.log(err);        
      }
    });
  }

  markOrderAsDelivered(): void{
    this.orderService.putOrderAsShipped(this.token, this.order.id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
}
