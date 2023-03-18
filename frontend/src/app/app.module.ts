import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { ProdListComponent } from './components/pages/prod-list/prod-list.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ProductComponent } from './components/pages/product/product.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { OrderComponent } from './components/pages/order/order.component';
import { UserOptionsComponent } from './components/pages/user-options/user-options.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { SearchComponent } from './components/pages/search/search.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { BuyComponent } from './components/pages/buy/buy.component';
import { AddToCartComponent } from './components/partials/add-to-cart/add-to-cart.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { AdminUsersComponent } from './components/pages/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/pages/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { AdminOrderDetailComponent } from './components/pages/admin-order-detail/admin-order-detail.component';
import { AdminProductDetailComponent } from './components/pages/admin-product-detail/admin-product-detail.component';
import { AdminUserDetailComponent } from './components/pages/admin-user-detail/admin-user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProdListComponent,
    ProfileComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    UserOptionsComponent,
    ContactComponent,
    SearchComponent,
    CartComponent,
    BuyComponent,
    AddToCartComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrderDetailComponent,
    AdminProductDetailComponent,
    AdminUserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
