import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ProductComponent } from './components/pages/product/product.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProdListComponent } from './components/pages/prod-list/prod-list.component';
import { SearchComponent } from './components/pages/search/search.component';
import { UserOptionsComponent } from './components/pages/user-options/user-options.component';
import { OrderComponent } from './components/pages/order/order.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { BuyComponent } from './components/pages/buy/buy.component';
import { ContactComponent } from './components/pages/contact/contact.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "pen-tablets", component: ProdListComponent},
  {path: "pen-displays", component: ProdListComponent},
  {path: "accessories", component: ProdListComponent},
  {path: "product/:product_id", component: ProductComponent},
  {path: "contact", component: ContactComponent},
  {path: "search", component: SearchComponent},

  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent},
  {path: "profile/options", component: UserOptionsComponent},
  {path: "profile/orders/:order_id", component: OrderComponent},
  
  {path: "cart", component: CartComponent},
  {path: "buy", component: BuyComponent},
  
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: "**", redirectTo: "page-not-found", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
