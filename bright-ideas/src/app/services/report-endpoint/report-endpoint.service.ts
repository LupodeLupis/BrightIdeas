import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportEndpointService {
  private url = "https://bright-ideas-api.herokuapp.com";

  constructor(private http: HttpClient) { }

  getAllReport(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/reports`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getReportById(reportId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/report/${reportId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getReportByFlaggedIdea(flaggedIdeaId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/report/ideaId=${flaggedIdeaId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getReportByFlaggedUser(flaggedUserId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/report/userId=${flaggedUserId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }
}
