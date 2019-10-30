import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({ providedIn: 'root' })

export class FollowerEndpointService {
   private url = environment.api;

   constructor(private http: HttpClient) {}

   getFollowerbyId(id: string): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.get(`${this.url}/follower/${id}`).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   getAllFollowers(): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.get(`${this.url}/follower`).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   createFollower(body: object): Observable <any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.post(`${this.url}/follower/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   deleteFollower(followerId: string): Observable <any> {
      return Observable.create((observer: Observer<any>) =>{
         this.http.delete(`${this.url}/follower/delete/${followerId}`).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error.message);
         });
      });
   }
}
