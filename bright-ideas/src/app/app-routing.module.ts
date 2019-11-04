import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { ResetPasswordComponent } from './modules/auth/component/reset-password/reset-password.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component';
import { IdeaSearchResultsComponent } from './modules/layout/idea-search-results/idea-search-results.component';
import { ProfileSearchResultsComponent } from './modules/layout/profile-search-results/profile-search-results.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { UploadMediaComponent } from './modules/media/upload-media/upload-media.component';

const routes: Routes = [
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'viewMessage', component: ViewMessageComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'createIdea', component: CreateIdeaComponent },
    { path: 'uploadMedia', component: UploadMediaComponent },
    { path: 'idea/:id', component: ViewIdeaComponent },
    { path: 'searchResults/Ideas/:query', component: IdeaSearchResultsComponent },
    { path: 'searchResults/Profiles/:query', component: ProfileSearchResultsComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
