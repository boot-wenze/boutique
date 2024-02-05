import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoadingModule } from '../loading/loading.module';
import { EspaceComponent } from './espace/espace.component';
// import { BranchComponent } from './branch/branch.component';
import { FormsModule } from '@angular/forms';
import { CreateBranchComponent } from './create-branch/create-branch.component';
// import { PlanComponent } from './plan/plan.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EspaceComponent,
    CreateBranchComponent,
    // PlanComponent
    // BranchComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LoadingModule,
    FormsModule
  ]
})
export class DashboardModule { }
