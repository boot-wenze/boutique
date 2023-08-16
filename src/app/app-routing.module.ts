import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path : '',
    loadChildren : () => import("./home/home.module").then(m => m.HomeModule),
  },
  {
    path : 'commencer',
    loadChildren : () => import("./register/register.module").then(m => m.RegisterModule),
  },
  {
    path : 'finalisation',
    loadChildren : () => import("./finalisation/finalisation.module").then(m => m.FinalisationModule),
  },
  {
    path : 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
