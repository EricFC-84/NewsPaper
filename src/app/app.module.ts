import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { NewsCategoryComponent } from './news-category/news-category.component';
import { FormsModule} from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component'



let AppRoutes:Routes = [
  {"path": "", "component": HomeComponent},
  {"path":"article/:numArticle", "component": ArticleComponent},
  {"path": "section/:category", "component":NewsCategoryComponent},
  {"path": "search/:query", "component":SearchResultsComponent},


  /* ,
  {"path": "login", "component":LoginComponent},
  {"path":"user/:author", "component": AuthorComponent},
  {"path":"entry/:numEntry", "component": EntryComponent},
  {"path": "**", "component": ErrorComponent} */
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ArticleComponent,
    NewsCategoryComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
