import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment"
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Observer, Subject } from "rxjs";
import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "../../models/user";
import bcrypt from 'bcryptjs';
import { SessionStorageService } from '../../shared/services/session-storage/session-storage.service';

@Injectable({
  providedIn: "root"
})

export class UserEndpointService {
    
   
    private url = environment.api;
    nameRegex = new RegExp('^[a-zA-Z]+$');
    userNameRegex = new RegExp('^[a-zA-Z0-9_-]{8,25}$');
    passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
   
    constructor(private http: HttpClient,
                private sessionStorageService: SessionStorageService) {}

    // Check that password and confirmPassword match, if not return an error
    matchPassword() {
        return (control: FormControl) => {
            if (control.value && control.parent) {
                let password = control.parent.get('password').value;
                return password == control.value ? null : { passNotMatching: true };
            };
        };
    };
    // Check that the form control value matches the passed in regExp pattern, if not return error
    customRegExpValidator(regExPattern: RegExp){
        return (control: FormControl) => {
            if (control.value && !control.value.match(regExPattern)) {
                return { invalid: true };
            } else {
                return null;
            };
        };
    };

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
        newUser.isVerified = 1;
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
