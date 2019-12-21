import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';

import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component';
import { IdeaSearchResultsComponent } from './modules/layout/idea-search-results/idea-search-results.component';
import { ProfileSearchResultsComponent } from './modules/layout/profile-search-results/profile-search-results.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { UploadMediaComponent } from './modules/media/upload-media/upload-media.component';
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component';
import { UserProfileComponent} from './modules/profile/user-profile/user-profile.component';
import { ViewUserProfileComponent } from './modules/profile/user-profile/view-user-profile/view-user-profile.component';
import { ViewApplicationsComponent } from './modules/layout/view-applications/view-applications.component'
import { IdeasFromMemberComponent } from './modules/layout/ideas-from-member/ideas-from-member.component'


// If you need any route protected add this code to the route you need --->    canActivate: [AuthGuardService]  <--
// NOTE THIS WILL ONLY CHECK TO SEE IF A VALID TOKEN IS FOUND IN LOCAL STORAGE
// IF IT NEEDS TO BE ROLE PROTECTED, WE NEED TO ADD A NEW AUTH GUARD
const routes: Routes = [
    // { path: 'changePassword',
    //   component: ChangePasswordComponent,
    //   canActivate: [AuthGuardService] },
    { path: 'createAccount',
      component: CreateAccountComponent },
    { path: 'viewMessage',
      component: ViewMessageComponent,
      canActivate: [AuthGuardService] },
    { path: 'home',
      component: HomeComponent},
    { path: 'login',
      component: LoginComponent},
    { path: 'profile/:id',
      component: UserProfileComponent,
      canActivate: [AuthGuardService]},
    { path: 'profile/user/:id',
      component: ViewUserProfileComponent },
    { path: 'resetPassword',
      component: ChangePasswordComponent },
    { path: 'changePassword/:userEmail',
      component: ChangePasswordComponent },
    { path: 'createIdea',
      component: CreateIdeaComponent,
      canActivate: [AuthGuardService]},
    { path: 'uploadMedia',
      component: UploadMediaComponent,
      canActivate: [AuthGuardService] },
    { path: 'idea/:ideaId',
      component: ViewIdeaComponent,
      canActivate: [AuthGuardService] },
    { path: 'searchResults/Ideas/:query',
      component: IdeaSearchResultsComponent },
    { path: 'searchResults/Profiles/:query',
      component: ProfileSearchResultsComponent},
    { path: 'applications', component: ViewApplicationsComponent },
    { path: 'joinedIdeas', component: IdeasFromMemberComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //{onSameUrlNavigation: 'reload'}
  exports: [RouterModule]
})
export class AppRoutingModule { }
