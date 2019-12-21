import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ContentComponent } from './modules/layout/content/content.component';
import { ChangePasswordComponent } from './modules/auth/component/change-password/change-password.component';
import { CreateIdeaComponent } from './modules/idea/component/create-idea/create-idea.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './modules/layout/home/home.component';
import { IdeaSearchResultsComponent } from './modules/layout/idea-search-results/idea-search-results.component';
import { ProfileSearchResultsComponent } from './modules/layout/profile-search-results/profile-search-results.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component'
import { LoginComponent } from './modules/auth/component/login/login.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { UploadMediaComponent } from './modules/media/upload-media/upload-media.component';
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component';
import { CreatePositionComponent } from './modules/idea/component/create-idea/create-position/create-position.component';
import { ModalNotificationComponent } from './shared/component/modal-notification/modal-notification.component';
import { AuthInterceptorService } from './shared/services/authInterceptor/auth-interceptor.service';
import { EditPositionComponent } from './modules/idea/component/create-idea/edit-position/edit-position.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { UserProfileComponent } from './modules/profile/user-profile/user-profile.component';
import { ViewUserProfileComponent } from './modules/profile/user-profile/view-user-profile/view-user-profile.component';
import { EditIdeaComponent } from './modules/idea/component/edit-idea/edit-idea.component';
import { ModalModule } from 'ngx-bootstrap';
import { DeleteNotificationComponent } from './shared/component/delete-notification/delete-notification.component';
import { ApplyPositionModalComponent } from './modules/idea/component/view-idea/Modals/apply-position-modal/apply-position-modal.component';
import { AddUpdateModalComponent } from './modules/idea/component/view-idea/Modals/add-update-modal/add-update-modal.component';
import { SingleIdeaComponent } from './modules/layout/home/single-idea/single-idea.component';
import { ViewApplicationsComponent } from './modules/layout/view-applications/view-applications.component';
import { IdeasFromMemberComponent } from './modules/layout/ideas-from-member/ideas-from-member.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ChangePasswordComponent,
    CreateIdeaComponent,
    HomeComponent,
    IdeaSearchResultsComponent,
    CreateIdeaComponent,
    ViewIdeaComponent,
    LoginComponent,
    PageNotFoundComponent,
    ViewMessageComponent,
    UploadMediaComponent,
    ProfileSearchResultsComponent,
    CreateAccountComponent,
    CreatePositionComponent,
    ModalNotificationComponent,
    EditPositionComponent,
    FooterComponent,
    UserProfileComponent,
    ViewUserProfileComponent,
    EditIdeaComponent,
    DeleteNotificationComponent,
    ApplyPositionModalComponent,
    AddUpdateModalComponent,
    SingleIdeaComponent,
    ViewApplicationsComponent,
    IdeasFromMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi   : true,
    },
    NgbActiveModal
  ],
  entryComponents: [
    ModalNotificationComponent,
    DeleteNotificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
