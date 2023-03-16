import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerUser = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern(/^.{8,16}$/),Validators.required]),
      confirm_password: new FormControl('', Validators.required)
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

    if(this.registerUser.invalid || this.registerUser.get('password')?.value != this.registerUser.get('confirm_password')?.value){
      this.errorMessage = "Check your data";
      return;
    }

    let userData = {
      first_name : this.registerUser.get("first_name")?.value,
      last_name : this.registerUser.get("last_name")?.value,
      email : this.registerUser.get("email")?.value,
      password : this.registerUser.get("password")?.value,
    };

    this.userService.register(userData).subscribe({
      next: (res:any) => {
        console.log(res);
        let signUpCompleted = document.getElementById("signUpCompleted");
        let signUpForm = document.getElementById("signUpForm");

        if(signUpCompleted != null && signUpForm != null){
          signUpForm.style.display = "none";
          signUpCompleted.style.display = "block";
        }
      },
      error: (err:any) => {
        console.log(err.error);
        this.errorMessage = err.error.message;
      }
    });
  }
}