import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MemberEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getAllMember(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getMemberById(memberId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member/${memberId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getMemberByUserId(userId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member/user/${userId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

   //Not in BrightIdeasAPI
  /*getMemberByRoleId(roleId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member/roleId=${roleId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }*/

  getMemberByIdeaId(ideaId): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member/idea/${ideaId}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

   //Not in BrightIdeasAPI
  /*getMemberByLevel(memLvl): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/member/memberLevel=${memLvl}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }*/

  createMember(body: object): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.post(`${this.url}/member/create`, body).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }

 updateMember(body: object): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.put(`${this.url}/member/update`, body).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }

 deleteMember(id): Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     this.http.delete(`${this.url}/member/delete/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
     },
     (error: HttpErrorResponse) => {
        observer.error(error);
     });
  });
 }
}
