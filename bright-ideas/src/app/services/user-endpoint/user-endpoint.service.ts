import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root"
})
export class UserEndpointService {
  private url = "https://bright-ideas-api.herokuapp.com";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  getUserById(id): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/user/` + id);
  }
}
