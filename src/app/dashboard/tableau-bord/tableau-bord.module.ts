import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauBordRoutingModule } from './tableau-bord-routing.module';
import { TableauBordComponent } from './tableau-bord.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    TableauBordComponent
  ],
  imports: [
    CommonModule,
    TableauBordRoutingModule,
    MatDialogModule
  ]
})
export class TableauBordModule { }
