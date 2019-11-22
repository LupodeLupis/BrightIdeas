import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Posting } from '../../models/posting';

@Injectable({
  providedIn: 'root'
})
export class PostingEndpointService {
   showPositionList = new Subject<Posting []>();
   currentPositionEdited = new Subject<Posting>();

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllPosting(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/posting`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getPostingById(postingId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/posting/${postingId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getPostingByWildcard(filter): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/posting/filter/${filter}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  /*getPostingByDescriptionWildcard(postingDesc): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/postings/postingDescription%${postingDesc}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }*/

  getPostingWithOpenPositions(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/posting/filter/open`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  createPosting(body: object): Observable<any> {
   // console.log('this is the posting body', body )
   return Observable.create((observer: Observer<any>) => {
     this.http.post(`${this.url}/posting/create`, body).subscribe((res: any) => {
      //   console.log(res)
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }

 updatePosting(body: object): Observable<any> {
   //console.log('body update posting', body)
   return Observable.create((observer: Observer<any>) => {
     this.http.put(`${this.url}/posting/update`, body).subscribe((res: any) => {
      console.log('response from update posting', res)
      observer.next(res);
      observer.complete();
     },
     (error: HttpErrorResponse) => {
      console.log(error)
      observer.error(error);
      console.log(error)
     });
  });
 }

 deletePosting(id): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.delete(`${this.url}/posting/delete/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }

 checkNumberValues(event: any): boolean {
   return isNaN(event.value);
 }
}
