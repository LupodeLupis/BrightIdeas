import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { Idea } from "../../models/idea";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root"
})
export class IdeaEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.url}/idea`);
  }

  getIdeaById(id: number): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.url}/idea/` + id);
  }

  createIdea(idea: object): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(`${this.url}/idea/create`, idea).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error)
        });
    });
  }

  deleteIdea(id: number): Observable<any> {
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

  updateIdea(idea: object): Observable<any> {
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
