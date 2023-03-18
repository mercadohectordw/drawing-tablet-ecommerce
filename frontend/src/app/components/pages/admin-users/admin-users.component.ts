import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  token!: string; 
  users!: User[]; 
  numPages!: number;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams['p']){
        let page = queryParams['p'];
        this.getUsers(token, page);
      } else {
        this.router.navigate(["/admin/users"],{queryParams: {p:1}});
      }
    });
  }

  getUsers(token:any, page:number = 0): void{
    if(token){
      this.userService.getAllUsersForAdmin(token, page).subscribe({
        next: (res:any) => {
          if(token){
            this.token = token;
            this.numPages = res.pages;
            this.users = res.rows;
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
}
