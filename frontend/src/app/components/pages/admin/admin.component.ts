import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dashboard: any = new Object; 

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getAdminDashboard(token).subscribe({
        next: (res:any) => {
          this.dashboard = res;
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
