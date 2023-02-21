import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ProductComponent } from './components/pages/product/product.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "product", component: ProductComponent},
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
