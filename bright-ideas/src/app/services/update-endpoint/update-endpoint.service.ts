import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getUpdateById(id: string): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.get(`${this.url}/update/${id}`).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
  }

  getAllUpdates(): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.get(`${this.url}/update`).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   getUpdateByIdea(ideaId: String): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.get(`${this.url}/update/idea/${ideaId}`).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   createUpdateDescriptionIdea(body: object): Observable <any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.post(`${this.url}/update/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }
   updateDescriptionIdea(body: object): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
         this.http.put(`${this.url}/update/update`, body).subscribe((res: any) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }
   deleteUpdateDescriptionIdea(updateId: string): Observable <any> {
      return Observable.create((observer: Observer<any>) =>{
         this.http.delete(`${this.url}/update/delete/${updateId}`).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error.message);
         });
      });
   }
}
