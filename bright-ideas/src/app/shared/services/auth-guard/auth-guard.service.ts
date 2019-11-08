import { tokenIsValid } from  '../../../../../indexedDB-manager.js'
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) { };
  
    canActivate(): boolean {
        if(tokenIsValid()){
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        };
    };
};
