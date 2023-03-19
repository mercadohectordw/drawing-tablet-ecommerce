import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  token!: string;
  user: User = new User;

  constructor(private userService: UserService, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let user_id = this.route.snapshot.params['user_id'];
    
    if(token) {
      this.userService.getUserForAdmin(token, user_id).subscribe({
        next: (res:User) => {
          if(token){
            this.token = token;
            this.user = res;
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

  giveAdmin(): void{
    if(this.user.id)
    this.userService.postAdmin(this.token, this.user.id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  removeAdmin(): void{
    if(this.user.id)
    this.userService.deleteAdmin(this.token, this.user.id).subscribe({
      next: (res:any) => {
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
}
