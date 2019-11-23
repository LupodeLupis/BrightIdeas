import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';

import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component';
import { IdeaSearchResultsComponent } from './modules/layout/idea-search-results/idea-search-results.component';
import { ProfileSearchResultsComponent } from './modules/layout/profile-search-results/profile-search-results.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { UploadMediaComponent } from './modules/idea/component/create-idea/upload-media/upload-media.component';
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component';

// If you need any route protected add this code to the route you need --->    canActivate: [AuthGuardService]  <--
// NOTE THIS WILL ONLY CHECK TO SEE IF A VALID TOKEN IS FOUND IN LOCAL STORAGE
// IF IT NEEDS TO BE ROLE PROTECTED, WE NEED TO ADD A NEW AUTH GUARD
const routes: Routes = [
    { path: 'changePassword',
      component: ChangePasswordComponent },
    { path: 'createAccount',
      component: CreateAccountComponent },
    { path: 'viewMessage',
      component: ViewMessageComponent,
      canActivate: [AuthGuardService] },
    { path: 'home',
      component: HomeComponent,
      // runGuardsAndResolvers: 'always'
      }, 
    { path: 'login',
      component: LoginComponent },
    { path: 'profile',
      component: ProfilePageComponent,},
    //    { path: 'profile/:id', component: ProfilePageComponent },
    { path: 'changePassword',
      component: ChangePasswordComponent },
    { path: 'createIdea',
      component: CreateIdeaComponent},
    { path: 'uploadMedia',
      component: UploadMediaComponent },
    { path: 'idea/:id',
      component: ViewIdeaComponent },
    { path: 'searchResults/Ideas/:query',
      component: IdeaSearchResultsComponent },
    { path: 'searchResults/Profiles/:query',
      component: ProfileSearchResultsComponent},
    {
      path: 'logout',
      component: LoginComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //{onSameUrlNavigation: 'reload'}
  exports: [RouterModule]
})
export class AppRoutingModule { }
