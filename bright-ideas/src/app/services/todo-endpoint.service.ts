import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo'

@Injectable({
  providedIn: 'root'
})

export class TodoEndpointService {

  private url = "https://bright-ideas-api.herokuapp.com";

  constructor(private http: HttpClient) { }

  getAllToDo(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.url}/todos`);
  }

  getIdeaById(id): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.url}/todo/` + id);
  }
}
