<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ContentComponent } from './modules/layout/content/content.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/layout/home/home.component';
import { SearchResultsComponent } from './modules/layout/search-results/search-results.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ResetPasswordComponent } from './modules/auth/component/reset-password/reset-password.component';
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchIdeasQueriesComponent } from './search-ideas-queries/search-ideas-queries.component';
=======
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./modules/layout/header/header.component";
import { ContentComponent } from "./modules/layout/content/content.component";
import { ChangePasswordComponent } from "./modules/auth/component/change-password/change-password.component";
import { CreateIdeaComponent } from "./modules/idea/component/create-idea/create-idea.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./modules/layout/home/home.component";
import { SearchResultsComponent } from "./modules/layout/search-results/search-results.component";
import { ViewIdeaComponent } from "./modules/idea/component/view-idea/view-idea.component";
import { LoginComponent } from "./modules/auth/component/login/login.component";
import { ResetPasswordComponent } from "./modules/auth/component/reset-password/reset-password.component";
import { ProfilePageComponent } from "./modules/auth/component/profile-page/profile-page.component";
import { PageNotFoundComponent } from "./modules/layout/page-not-found/page-not-found.component";
import { ViewMessageComponent } from "./modules/chat/component/view-message/view-message.component";
<<<<<<< HEAD
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ChangePasswordComponent,
    CreateIdeaComponent,
    HomeComponent,
    SearchResultsComponent,
    CreateIdeaComponent,
    ViewIdeaComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfilePageComponent,
    PageNotFoundComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    ViewMessageComponent,
    SearchIdeasQueriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
=======
    ViewMessageComponent
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
=======
    ViewMessageComponent
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
