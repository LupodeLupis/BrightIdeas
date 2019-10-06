import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateEndpointService {
  private url = 'https://bright-ideas-api.herokuapp.com';

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
       this.http.get(`${this.url}/updates`).subscribe((res: any) => {
          observer.next(res);
          observer.complete();
       },
       (error: HttpErrorResponse) => {
          observer.error(error);
       });
    });
 }
}
