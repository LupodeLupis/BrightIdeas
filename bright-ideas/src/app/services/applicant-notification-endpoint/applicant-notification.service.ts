import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicantNotificationService {
  private url = environment.api;
  constructor(private http: HttpClient) { }


  getAllNotificationFromApplicant(): Observable  <any>  {

    console.log('getAllNotificationFromApplicant is called')
    return Observable.create( (observer: any) => {
      this.http.get(`${this.url}/application/applications`).subscribe((res: any) => {
        console.log(res)
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
        console.log(error)
     });
    });
  }
}
