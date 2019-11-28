
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Profile } from '../../models/profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProfileEndpointService {

private url = environment.api;

constructor(private http: HttpClient) {}

getProfiles(): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    this.http.get(`${this.url}/profile`).subscribe((res: any[]) => {
       observer.next(res);
       observer.complete();
    },
    (error: HttpErrorResponse) => {
       observer.error(error);
    });
 });;
}

getProfileById(id): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    this.http.get(`${this.url}/profile/${id}`).subscribe((res: any) => {
       observer.next(res);
       observer.complete();
    },
    (error: HttpErrorResponse) => {
       observer.error(error);
    });
 });
}

getProfileByWildcard(filter): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    this.http.get(`${this.url}/profile/filter/${filter}`).subscribe((res: any) => {
       observer.next(res);
       observer.complete();
    },
    (error: HttpErrorResponse) => {
       observer.error(error);
    });
 });
}

createProfile(profile): Observable<any> {
  console.log('this is the body of profile', profile)
  return Observable.create((observer: Observer<any>) => {
    this.http.post(`${this.url}/profile/create`, profile).subscribe((response) => {
      observer.next(response);
      observer.complete();
    },
      (error) => {
        observer.error(error)
        console.log(error)
      });
  });
}

deleteProfile(id): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    this.http.delete(`${this.url}/profile/delete/${id}`).subscribe((response) => {
      observer.next(response);
      observer.complete();
    },
      (error) => {
        observer.error(error.message);
      });
  });
}

updateProfile(profile): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    this.http.put(`${this.url}/profile/update`, profile).subscribe((response) => {
      observer.next(response);
      observer.complete();
    },
    (error) => {
      observer.error(error)
    });
  })
}
}
