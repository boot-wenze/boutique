import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  @ViewChild('addArticle', { read : ViewContainerRef }) container !: ViewContainerRef
  _index = 1
  _addArticleElement: any[] = []
  hideBtn = false

  constructor() { }

  ngOnInit(){}

  anotherArticle() {

    this._addArticleElement[this._index] = this.container.createComponent(
      ArticleComponent
    )

    this._index += 1
    if(this._index >= 10){
      this.hideBtn = true
    }
  }

}
