import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EspaceComponent } from './espace/espace.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { PlanComponent } from './plan/plan.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent,
    children: [
      {
        pathMatch: 'full',
        redirectTo: 'espace',
        path : ''
      },
      {
        path: 'espace',
        component: EspaceComponent
      },
      {
        path: 'create-branch',
        component: CreateBranchComponent
      },
      {
        path: 'plan',
        component: PlanComponent
      },
      {
        path: 'branch',
        loadChildren : ()=> import("./branch/branch.module").then(m => m.BranchModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
