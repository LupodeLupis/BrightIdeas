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
}
