import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tokenIsValid } from  '../../../../../indexedDB-manager.js'

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

}
