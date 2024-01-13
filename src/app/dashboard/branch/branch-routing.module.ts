import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: BranchComponent,
    children: [
      {
        pathMatch: "full",
        redirectTo: 'order',
        path: ''
      },
      {
        path: "order",
        loadChildren: () => import("./order/order-routing.module").then(m => m.OrderRoutingModule)
      },
      {
        path: "product",
        loadChildren: () => import("./product/product-routing.module").then(m => m.ProductRoutingModule)
      },
      {
        path: "product/add-product",
        component: AddProductComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
