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
  
	// Todas las categorías de que apareceran en la navbar. Predefinidas en la API
  allCategories:string[]=["Business", "Entertainment", "General", "Health", "Sciense", "Sports", "Technology"]
  
	//filtros aplicados, que se defininen incialmente. TO DO: según LocalStorage o Geolocalización
  filters:object={ 
    country: "",
	language: "es",
	category: "",
	source: "",
	q: "",
	page:""
  }
  apiKey:string = "af5b0b0c46f142c9b17ebb8594d353d9"

  getNewsByFilters(newFilters:object){
	this.filters = JSON.parse(JSON.stringify(newFilters))
	let url = this.generateUrl();
	this.getNews(url).subscribe(
		(response) => {
			this.filteredArticles = [...response["articles"]];
			console.log(this.filteredArticles)
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
	this.getNewsByFilters(this.filters)
  }
}
