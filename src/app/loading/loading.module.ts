import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading.component';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoadingComponent],
})
export class LoadingModule { }
