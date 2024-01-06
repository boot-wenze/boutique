import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EspaceComponent } from './espace/espace.component';

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
        path: 'branch',
        loadChildren : ()=> import("./branch/branch.module").then(m => m.BranchModule)
      },
      // {
      //   path: 'articles',
      //   loadChildren : ()=> import("./articles/articles.module").then(m => m.ArticlesModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
