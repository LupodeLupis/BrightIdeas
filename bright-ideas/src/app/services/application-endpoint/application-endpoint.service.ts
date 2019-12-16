import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Application } from '../../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationEndpointService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllApplication(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/application`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getApplicationById(applicationId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/application/${applicationId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getApplicationByIdeaLeader(leaderId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/application/ideaLeader/${leaderId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  createApplication(body: object): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
      console.log("In endpoint sevice...")
     this.http.post(`${this.url}/application/create`, body).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
        console.log(error);
     });
  });
 }

 updateApplication(body: object): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.put(`${this.url}/application/update`, body).subscribe((res: any) => {
      observer.next(res);
      observer.complete();
     },
     (error: HttpErrorResponse) => {
      observer.error(error);
     });
  });
 }

  deleteApplication(id): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.delete(`${this.url}/application/delete/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }

}
