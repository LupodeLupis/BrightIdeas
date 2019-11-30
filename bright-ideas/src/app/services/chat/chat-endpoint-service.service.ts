import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllChat(): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
       this.http.get(`${this.url}/chat`).subscribe((res: any[]) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
  }
  getChatById(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
       this.http.get(`${this.url}/chat/${id}`).subscribe((res: any) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
  }

  createChat(body: object): Observable <any> {
     return Observable.create((observer: Observer<any>) => {
        this.http.post(`${this.url}/message/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
        },
        (error: HttpErrorResponse) => {
           observer.error(error)
        });
     });
  }

  deleteChat(chatId: string): Observable <any> {
     return Observable.create((observer: Observer<any>) =>{
      this.http.delete(`${this.url}/chat/delete/${chatId}`).subscribe((response: any) => {
         observer.next(response);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error.message);
      });
   });
  }
}

}
