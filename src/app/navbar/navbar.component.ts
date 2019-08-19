import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataService
} from '../services/data.service';
import {
  ApiService
} from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


query:string;


  loadSection(section) {
    console.log(section)
    let filters: object = {
      country: this._data.currentCountry,
      language: this._data.currentLanguage,
      category: section,
      sources: "",
      q: "",
      page: ""
    };
    console.log(filters)
    this._data.filteredArticles = [];
    this._data.getNewsByFilters(filters)
  }


changeLanguage(country:string){
  let filters: object = {
    country: country,
    language: this._data.currentLanguage,
    category: this._data.currentCategory,
    sources: "",
    q: "",
    page: ""
  };
  this._data.currentCountry=country;
  this._data.filteredArticles = [];
  this._data.getNewsByFilters(filters)


}



  goHome(){
    this._data.filteredArticles = [...this._data.allArticles]
  }

  constructor(public _data: DataService, public _api: ApiService, public _navigate:Router) {}

  ngOnInit() {
    let date:string = this.getDate(Date.now());
 
    document.querySelectorAll("#todays_date")[0].textContent= date;
  }


  getDate(timestamp:number):string {
    var date = new Date(timestamp);
    let timestampOrg = date.toString();

    return timestampOrg.slice(0,15)

  }

  search(){
    console.log(this.query);
    let filters: object = {
      country: this._data.currentCountry,
      language: "",
      category: "",
      sources: "",
      q: this.query,
      page: ""
    }
    this._data.getNewsByFilters(filters);
    this._navigate.navigateByUrl("/search/"+this.query)

  }
}
