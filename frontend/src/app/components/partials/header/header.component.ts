import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User = new User;
  formSearch!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService:UserService, private router: Router) {
    this.formSearch = this.formBuilder.group({
      search: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.userService.getUser(token).subscribe({
        next: (res:User) => {
          this.user = res;
        },
        error: (err:any) => {
          localStorage.removeItem("token");
        }
      });
    }
  }

  dropdown(): void{
    let dropdown = document.getElementById("dropdownUserMenu");
    if(dropdown){
      dropdown.style.display == "none"
        ? dropdown.style.display = "block"
        : dropdown.style.display = "none";
    }
  }
  
  toggleSearch(): void{
    let searchForm = document.getElementById("search");
    if(searchForm){
      searchForm.style.display == "none"
        ? searchForm.style.display = "block"
        : searchForm.style.display = "none";
    }
  }

  search(): void{
    if(this.formSearch.valid){
      this.router.navigate(["/search"], {queryParams: {q:this.formSearch.get("search")?.value }});
    } else {
      this.toggleSearch();
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    this.user = new User;
    window.location.reload();
  }
}
