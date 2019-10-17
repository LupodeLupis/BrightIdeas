import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PostingEndpointService {

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

  getPostingByNameWildcard(postingName): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/postings/postingName%${postingName}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getPostingByDescriptionWildcard(postingDesc): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/postings/postingDescription%${postingDesc}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getPostingWithOpenPositions(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/postings/open`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }
}
