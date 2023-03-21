import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginUser = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern(/^.{8,16}$/), Validators.required])
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: (res:User) => {
          this.router.navigateByUrl("/home");
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    }
  }

  submitForm(): void{

    if(this.loginUser.invalid){
      this.errorMessage = "Check your data";
      return;
    }

    let userData = {
      email : this.loginUser.get("email")?.value,
      password : this.loginUser.get("password")?.value
    }
    
    this.userService.login(userData).subscribe({
      next: (res:any) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl("/home").then(() => {
          window.location.reload();
        });
      },
      error: (err:any) => {
        console.log(err.error);
        this.errorMessage = "User not found";
      }
    });
  }
}
