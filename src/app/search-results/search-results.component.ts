import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {


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

  constructor(public _data:DataService) { }

  ngOnInit() {
  }

}
