import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  currentArticleId:string = "0";

  constructor(public _routeActive:ActivatedRoute, public _data:DataService) { }

  ngOnInit() {
    this._routeActive.paramMap.subscribe(
      (params) => {
        this.currentArticleId = params.get("numArticle");
        console.log(this.currentArticleId)
        this._data.currentArticle = JSON.parse(JSON.stringify(this._data.filteredArticles[this.currentArticleId]))
      }
    )
  }
  loadSources(){
    let filters: object = {
      country: "",
      language: "",
      category: "",
      sources: this._data.currentArticle["source"]["id"],
      q: "",
      page: ""
    }
    this._data.searchResults = [];
    this._data.getNewsByFilters(filters);

  }
}
