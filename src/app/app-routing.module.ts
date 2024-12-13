import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ShippingComponent} from './components/shipping/shipping.component';
import {ProfileComponent} from './components/account/profile.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent
  },
  {
    path: "category/:id",
    component: ProductsListComponent
  },
  {
    path: "view/:id",
    component: ViewProductComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "ship",
    component: ShippingComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
