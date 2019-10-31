import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { ToDo } from "../../models/todo";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root"
})
export class TodoEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) {}
    
  getToDos(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/to-do`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });;
  }

  getToDoById(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/to-do/${id}`).subscribe((res: any) => {
         observer.next(res);
         observer.complete();
      },
      (error: HttpErrorResponse) => {
         observer.error(error);
      });
   });
  }

  createToDo(toDo): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(`${this.url}/to-do/create`, toDo).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error)
        });
    });
  }

  deleteToDo(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.delete(`${this.url}/to-do/delete/${id}`).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error.message);
        });
    });
  }

  updateToDo(toDo): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.put(`${this.url}/to-do/update`, toDo).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
      (error) => {
        observer.error(error)
      });
    })
  }
}
