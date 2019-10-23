import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import bcrypt from 'bcryptjs';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class UserEndpointService {
    private url = "https://bright-ideas-api.herokuapp.com";

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/user`);
    }

    getUserById(id): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/user/` + id);
    }

    registerUser(form: FormGroup): Observable<any>{
        // Create a new user object
        let newUser = new User;
        newUser.emailAddress = form.get('eMail').value;
        newUser.password = this.getSaltAndHashPassword(form.get('password').value);
        newUser.previousPasswords = newUser.password;
        return this.http.post<User>(`${this.url}/user/create`, newUser);
    }

    getSaltAndHashPassword(password: string){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }
}
