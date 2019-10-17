import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
<<<<<<< HEAD
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

=======
import { HttpClient, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac


@Injectable({
  providedIn: 'root'
})
export class MessageEndpointService {
<<<<<<< HEAD
  private url = 'https://bright-ideas-api.herokuapp.com';
=======
  private url = environment.api;
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
<<<<<<< HEAD
       this.http.get(`${this.url}/messages`).subscribe((res: any[]) => {
=======
       this.http.get(`${this.url}/message`).subscribe((res: any[]) => {
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
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

<<<<<<< HEAD





=======
  createMessage(body: object): Observable <any> {
     return Observable.create((observer: Observer<any>) => {
        this.http.post(`${this.url}/message/create`, body).subscribe((response: any) => {
            observer.next(response);
            observer.complete();
        },
        (error: HttpErrorResponse) => {
           observer.error(error);
        });
     });
  }
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
}
