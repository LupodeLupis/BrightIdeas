import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChangePasswordComponent} from './modules/auth/component/change-password/change-password.component'

const routes: Routes = [
    { path: 'changePassword', component: ChangePasswordComponent }
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
