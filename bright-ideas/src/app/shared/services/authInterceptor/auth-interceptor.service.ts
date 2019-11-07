import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { tokenIsValid } from  '../../../../../indexedDB-manager.js'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return next.handle(req);
    }
}