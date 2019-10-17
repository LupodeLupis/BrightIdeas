import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
       this.http.get(`${this.url}/message`).subscribe((res: any[]) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
  }
  getMessagebyId(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
       this.http.get(`${this.url}/message/${id}`).subscribe((res: any) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
  }

  createMessage(body: object): Observable <any> {
     return Observable.create((observer: Observer<any>) => {
        this.http.put(`${this.url}/message/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
        },
        (error: HttpErrorResponse) => {
           observer.error(error);
        });
     });
  }
}
