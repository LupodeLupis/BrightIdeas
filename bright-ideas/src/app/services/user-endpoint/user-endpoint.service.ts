import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root"
})
export class UserEndpointService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/user`).subscribe((res: any[]) => {
        observer.next(res);
        observer.complete();
      },
        (error: HttpErrorResponse) => {
          observer.error(error);
        });
    });;
  }

  getUserById(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.url}/user/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      },
        (error: HttpErrorResponse) => {
          observer.error(error);
        });
    });
  }

  createUser(user): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(`${this.url}/user/create`, user).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error)
        });
    });
  }

  deleteUser(id): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.delete(`${this.url}/user/delete/${id}`).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error.message);
        });
    });
  }

  updateUser(user): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.put(`${this.url}/user/update`, user).subscribe((response) => {
        observer.next(response);
        observer.complete();
      },
        (error) => {
          observer.error(error)
        });
    })
  }
}
