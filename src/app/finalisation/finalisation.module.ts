import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalisationRoutingModule } from './finalisation-routing.module';
import { FinalisationComponent } from './finalisation.component';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FinalisationComponent
  ],
  imports: [
    CommonModule,
    FinalisationRoutingModule,
    LoadingModule,
    FormsModule
  ]
})
export class FinalisationModule { }
