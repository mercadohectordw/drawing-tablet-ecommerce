import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {
  user!: User;
  token!: string;

  updateData: FormGroup;
  updatePassword: FormGroup;
  
  errorDataMessage = "";
  doneDataMessage = "";
  errorPasswordMessage = "";
  donePasswordMessage = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.updateData = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]), 
    });
    this.updatePassword = this.formBuilder.group({
      password: new FormControl('', [Validators.pattern(/^.{8,16}$/), Validators.required]),
      confirm_password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: (res:User) => {
          this.user = res;

          this.updateData.get("first_name")?.setValue(res.first_name);
          this.updateData.get("last_name")?.setValue(res.last_name);
          this.updateData.get("email")?.setValue(res.email);

          if(token) this.token = token;
        },
        error: (err:any) => {
          localStorage.removeItem("token");
          this.router.navigateByUrl("/home");
        }
      });
    }
  }

  submitData(): void{
    if (this.updateData.invalid){
      this.errorDataMessage = "Check your data";
      return;
    }

    let userData = {
      first_name : this.updateData.get("first_name")?.value,
      last_name : this.updateData.get("last_name")?.value,
      email : this.updateData.get("email")?.value
    };

    this.userService.updateUser(this.token, userData).subscribe({
      next: (res:any) => {
        this.doneDataMessage = res.message;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (err:any) => {
        console.log(err);
        this.errorDataMessage = err.message;
      }
    });
  }

  submitPassword(): void{
    if(this.updatePassword.invalid || this.updatePassword.get('password')?.value != this.updatePassword.get('confirm_password')?.value){
      this.errorPasswordMessage = "Check your data";
      return;
    }

    let newPassword = {
      password : this.updatePassword.get('password')?.value
    };

    this.userService.updateUserPassword(this.token, newPassword).subscribe({
      next: (res:any) => {
        this.donePasswordMessage = res.message;
      },
      error: (err:any) => {
        console.log(err);
        this.errorPasswordMessage = err.message;
      }
    });
  }
}
