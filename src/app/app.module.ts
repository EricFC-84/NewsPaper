import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';



let AppRoutes:Routes = [
  {"path": "", "component": HomeComponent}/* ,
  {"path": "login", "component":LoginComponent},
  {"path":"user/:author", "component": AuthorComponent},
  {"path":"entry/:numEntry", "component": EntryComponent},
  {"path": "**", "component": ErrorComponent} */
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
