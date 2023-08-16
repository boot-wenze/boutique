import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalisationComponent } from './finalisation.component';

const routes: Routes = [
  {
    path: '',
    component : FinalisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalisationRoutingModule { }
