import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ContentComponent } from './modules/layout/content/content.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { HomeComponent } from './modules/layout/home/home.component';
import { SearchResultsComponent } from './modules/layout/search-results/search-results.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component';
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ResetPasswordComponent } from './modules/auth/component/reset-password/reset-password.component';
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ChangePasswordComponent,
    HomeComponent,
    SearchResultsComponent,
    CreateIdeaComponent,
    ViewIdeaComponent,
    CreateAccountComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfilePageComponent,
    PageNotFoundComponent,
    ViewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
