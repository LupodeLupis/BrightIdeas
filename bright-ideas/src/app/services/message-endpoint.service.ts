import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class MessageEndpointService {
  private url = 'https://bright-ideas-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any[]> {
    return Observable.create((observer: Observer<any[]>) => {
       this.http.get(`${this.url}/messages`).subscribe((res: any[]) => {
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






}
