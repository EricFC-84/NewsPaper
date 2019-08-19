import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {

  constructor(public _data:DataService, public _routeActive:ActivatedRoute) { }

  ngOnInit() {
    this._routeActive.paramMap.subscribe(
      (params) => {
        this._data.filteredArticles = [];
        this._data.currentCategory = params.get("category");
        console.log(this._data.currentCategory)       
        let filters: object = {
          country: this._data.currentCountry,
          language: this._data.currentLanguage,
          category: this._data.currentCategory,
          sources: "",
          q: "",
          page: ""
        };
        this._data.getNewsByFilters(filters);      
      }
    )
  }
  loadSources(sourceId:string){
    let filters: object = {
      country: "",
      language: "",
      category: "",
      sources: sourceId,
      q: "",
      page: ""
    }
    this._data.searchResults = [];
    this._data.getNewsByFilters(filters);
  }

}
