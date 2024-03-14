import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

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
        component: OrderComponent
      },
      {
        path: "product",
        component: ProductComponent
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
