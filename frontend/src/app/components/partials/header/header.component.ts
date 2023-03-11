import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: (res:User) => {
          this.user = res;
          console.log(this.user);
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    }
  }

}
