import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { User } from "../../models/user";
import bcrypt from 'bcryptjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: "root"
})

export class UserEndpointService {

    private url = environment.api;
    nameRegex = new RegExp('^[a-zA-Z]+$');
    userNameRegex = new RegExp('^[a-zA-Z0-9_-]{8,25}$');
    passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
   
    constructor(private http: HttpClient) {}

    login(form: FormGroup): Observable<any> {
        let newUser = new User;
        newUser.emailAddress = form.get('eMail').value;
        newUser.password = form.get('password').value;
        return this.http.post<User>(`${this.url}/user/login`, newUser);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/user`);
    }

    // We need to get by eMail instead of ID
    getUserByEmail(eMail): Observable<User> {
        return this.http.get<User>(`${this.url}/user/` + eMail);
    }

    registerUser(form: FormGroup): Observable<any>{
        let newUser = this.createUserObject(form);
        return this.http.post<User>(`${this.url}/user/create`, newUser);
    }

    createUserObject(form: FormGroup){
        let newUser = new User;
        newUser.emailAddress = form.get('eMail').value;
        newUser.password = this.getSaltAndHashPassword(form.get('password').value);
        newUser.previousPasswords = newUser.password;
        return newUser;
    }

    getSaltAndHashPassword(password: string){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

//   getUsers(): Observable<any> {
//     return Observable.create((observer: Observer<any>) => {
//       this.http.get(`${this.url}/user`).subscribe((res: any[]) => {
//         observer.next(res);
//         observer.complete();
//       },
//         (error: HttpErrorResponse) => {
//           observer.error(error);
//         });
//     });;
//   }

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
