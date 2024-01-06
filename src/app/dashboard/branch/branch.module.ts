import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    BranchComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class BranchModule { }
