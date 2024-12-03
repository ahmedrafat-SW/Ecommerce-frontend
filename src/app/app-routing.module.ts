import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ViewProductComponent} from './components/view-product/view-product.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent
  },
  {
    path: "view/:id",
    component: ViewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
