import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauBordComponent } from './tableau-bord.component';

const routes: Routes = [
  {
    path: '',
    component : TableauBordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableauBordRoutingModule { }
