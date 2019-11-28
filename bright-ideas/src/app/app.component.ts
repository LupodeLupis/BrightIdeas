import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  error: any;
  constructor(private authService: AuthService) {

  }

  ngOnInit(){
    this.initializeExistingUser();
    this.initializeNonExistingUser();
  }



  initializeExistingUser() {
    this.authService.me().subscribe(user => {
      this.user = user;
    },
    err => {
      this.error = err;
    });
  }

  initializeNonExistingUser() {
    this.authService.getUserSource$().subscribe((user) => {
      this.user = user;
    }, err => {
      this.error = err;
    });
  }
}

