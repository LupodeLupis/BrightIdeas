import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Media } from '../../models/media';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MediaEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllMedia(): Observable<Media[]> {
    return Observable.create((observer: Observer<Media[]>) => {
       this.http.get(`${this.url}/media`).subscribe((res: Media[]) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
  }

  getMediabyId(id: string): Observable<Media> {
    return Observable.create((observer: Observer<Media>) => {
         this.http.get(`${this.url}/media/${id}`).subscribe((res: Media) => {
            observer.next(res);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
  }

  createMedia(body: object): Observable <any> {
   return Observable.create((observer: Observer<any>) => {
         this.http.post(`${this.url}/media/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
         },
         (error: HttpErrorResponse) => {
            observer.error(error);
         });
      });
   }

   updateMedia(body: object): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
        this.http.put(`${this.url}/media/update`, body).subscribe((res: any) => {
           observer.next(res);
           observer.complete();
        },
        (error: HttpErrorResponse) => {
           observer.error(error);
        });
     });
    }

   deleteMedia(mediaId: string): Observable <any> {
      return Observable.create((observer: Observer<any>) =>{
       this.http.delete(`${this.url}/media/delete/${mediaId}`).subscribe((response: any) => {
          observer.next(response);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error.message);
       });
    });
   }
}
