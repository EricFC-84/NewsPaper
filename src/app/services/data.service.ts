import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  allArticles:object[]=[]		// Todas las noticias iniciales (cargadas inicialmente con los flitros básicos)
  filteredArticles:object[]=[]	// Solo noticias del "allArticles" que cumplan nuevos filtros seleccionados
  showArticles:object[]=[]		// Los que se muestran en pantalla si hay más de X
  maxShownArticles:number = 50
  currentArticle:object = {};
  searchResults:object[] = []
	// Todas las categorías de que apareceran en la navbar. Predefinidas en la API
  allCategories:string[]=["business", "entertainment", "general", "health", "science", "sports", "technology"]
  allCountries:string[]=["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
	//filtros aplicados, que se defininen incialmente. TO DO: según LocalStorage o Geolocalización
  
  apiKey:string = "af5b0b0c46f142c9b17ebb8594d353d9";
  currentCountry = "us";
  currentLanguage = "en";
  currentCategory = "general";


  filters:object={ 
    country: this.currentCountry,
	language: this.currentLanguage,
	category: "",
	sources: "",
	q: "",
	page:""
  }

  getNewsByFilters(newFilters:object){
	this.filters = JSON.parse(JSON.stringify(newFilters))
	let url = this.generateUrl();
	this.getNews(url).subscribe(
		(response) => {
			if (this.filters["q"] != "" || this.filters["sources"] != "") { 
				this.searchResults = [...response["articles"]]
				this.filteredArticles = [...response["articles"]]
			} else {

				this.filteredArticles = [...response["articles"]];
				console.log(this.filteredArticles)
			}
		}
	);
  }

  generateUrl():string{
	let base_url = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?";
	let filters_url = "";
	let filterKeys = Object.keys(this.filters)
	for (let i = 0; i < filterKeys.length; i++) {		
		if (this.filters[filterKeys[i]] != ""){
			if (filters_url != ""){
				filters_url += "&";
		  	}
			filters_url += filterKeys[i] + "=" + this.filters[filterKeys[i]];
		}
	}
	filters_url += "&apiKey=" + this.apiKey;
	let final_url = base_url + filters_url
	console.log(final_url)
	return final_url;
  }

  getNews(url:string){
	return this._api.get(url)
  }

  constructor(public _api:ApiService) { 
	  this.getNews(this.generateUrl()).subscribe(
		  (response) => {
			  this.allArticles = [...response["articles"]]
			  this.filteredArticles = [...response["articles"]]

			  console.log("all:", this.allArticles)
			  console.log("filtered:", this.filteredArticles)
		  }
	)
	// this.getNewsByFilters(this.filters)
  }
}
