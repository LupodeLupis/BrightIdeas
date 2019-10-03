import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/layout/home/home.component'
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component'
import { LoginComponent } from './modules/auth/component/login/login.component'
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component'
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component'
import { ResetPasswordComponent } from './modules/auth/component/reset-password/reset-password.component'
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component'
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component'
import { SearchResultsComponent } from './modules/layout/search-results/search-results.component'
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component'


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'createAccount', component: CreateAccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'createIdea', component: CreateIdeaComponent },
    { path: 'idea', component: ViewIdeaComponent },
    { path: 'searchResults', component: SearchResultsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
