import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ProductComponent } from './components/pages/product/product.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProdListComponent } from './components/pages/prod-list/prod-list.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "pen-tablets", component: ProdListComponent},
  {path: "pen-displays", component: ProdListComponent},
  {path: "accessories", component: ProdListComponent},
  {path: "product/:product_id", component: ProductComponent},

  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent},
  
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: "**", redirectTo: "page-not-found", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
