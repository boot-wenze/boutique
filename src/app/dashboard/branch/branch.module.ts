import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BranchComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class BranchModule { }
