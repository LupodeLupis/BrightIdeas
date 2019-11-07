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
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/layout/home/home.component';
import { IdeaSearchResultsComponent } from './modules/layout/idea-search-results/idea-search-results.component';
import { ProfileSearchResultsComponent } from './modules/layout/profile-search-results/profile-search-results.component';
import { ViewIdeaComponent } from './modules/idea/component/view-idea/view-idea.component'
import { LoginComponent } from './modules/auth/component/login/login.component';
import { ResetPasswordComponent } from './modules/auth/component/reset-password/reset-password.component';
import { ProfilePageComponent } from './modules/auth/component/profile-page/profile-page.component';
import { PageNotFoundComponent } from './modules/layout/page-not-found/page-not-found.component';
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';
import { UploadMediaComponent } from './modules/media/upload-media/upload-media.component';
import { CreateAccountComponent } from './modules/auth/component/create-account/create-account.component';
import { CreatePositionComponent } from './modules/idea/component/create-idea/create-position/create-position.component';
import { ModalNotificationComponent } from './shared/component/modal-notification/modal-notification.component';


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
    ResetPasswordComponent,
    ProfilePageComponent,
    PageNotFoundComponent,
    ViewMessageComponent,
    UploadMediaComponent,
    ProfileSearchResultsComponent,
    CreateAccountComponent,
    CreatePositionComponent,
    ModalNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    ModalNotificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
