import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class FollowerService {
   private url = 'https://bright-ideas-api.herokuapp.com';

   constructor(private http: HttpClient) {}

   getFollowbyId(id: string): Observable<any> {
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
         this.http.get(`${this.url}/followers`).subscribe((res: any) => {
            observer.next(res);
            console.log(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

}