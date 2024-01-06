import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoadingModule } from '../loading/loading.module';
import { EspaceComponent } from './espace/espace.component';
// import { BranchComponent } from './branch/branch.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    EspaceComponent,
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
