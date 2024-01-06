import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule
  ]
})
export class ProductModule { }
