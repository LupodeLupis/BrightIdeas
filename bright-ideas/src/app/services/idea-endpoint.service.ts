import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idea } from '../models/idea'

@Injectable({
  providedIn: 'root'
})
export class IdeaEndpointService {

  private url = "https://bright-ideas-api.herokuapp.com";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.url}/ideas`);
  }

  getUserById(id): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.url}/idea/` + id);
  }
}
