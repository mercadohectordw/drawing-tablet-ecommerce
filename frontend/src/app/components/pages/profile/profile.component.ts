import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
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
    } else {
      this.router.navigateByUrl("/home");
    }
  }
}
