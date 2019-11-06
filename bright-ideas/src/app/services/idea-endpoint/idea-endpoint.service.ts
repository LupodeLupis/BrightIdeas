import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeaEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  // getIdeas(): Observable<Idea[]> {
  //   return this.http.get<Idea[]>(`${this.url}/idea`);
  // }

  // getIdeaById(id): Observable<Idea[]> {
  //   return this.http.get<Idea[]>(`${this.url}/idea/${id}`);
  // }

  // createIdea(idea: Idea): Observable<any> {
  //   return this.http.post<any>(`${this.url}/idea/create`, idea)
  // }

  // updateIdea(idea: Idea): Observable<any> {
  //   return this.http.put<any>(`${this.url}/idea/update`, idea);
  // }

  
  getIdeas(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/idea`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });;
  }

  getIdeaById(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/idea/${id}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  getIdeaByWildcard(filter): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/idea/filter/${filter}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  createIdea(idea): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(`${this.url}/idea/create`, idea).subscribe((response) => {
        console.log(response)
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error)
        });
    });
  }

  deleteIdea(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.delete(`${this.url}/idea/delete/${id}`).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error.message);
        });
    });
  }

  updateIdea(idea): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.put(`${this.url}/idea/update`, idea).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
      (error) => {
        observer.error(error)
      });
    })
  }
  
}
