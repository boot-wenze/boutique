import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardComponent,
    children: [
      {
        pathMatch: 'full',
        redirectTo: 'tableau-bord',
        path : ''
      },
      {
        path: 'tableau-bord',
        loadChildren : ()=> import("./tableau-bord/tableau-bord.module").then(m => m.TableauBordModule)
      },
      {
        path: 'articles',
        loadChildren : ()=> import("./articles/articles.module").then(m => m.ArticlesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
