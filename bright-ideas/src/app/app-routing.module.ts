import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChangePasswordComponent} from './modules/auth/component/change-password/change-password.component'
import { ViewMessageComponent } from './modules/chat/component/view-message/view-message.component';

const routes: Routes = [
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'viewMessage', component: ViewMessageComponent}
    // Add routes here
    /*
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
    */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
