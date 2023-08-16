import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CardModule } from 'src/app/component/card/card.module';
// import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    // ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MatTabsModule,
    CardModule
  ],
})
export class ArticlesModule { }
