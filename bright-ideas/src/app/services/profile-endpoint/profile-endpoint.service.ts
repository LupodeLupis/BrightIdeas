
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProfileEndpointService {

private url = environment.api;

constructor(private http: HttpClient) {}

getAllProfiles(): Observable<Profile[]> {
  return this.http.get<Profile[]>(`${this.url}/profile`);
}

getProfileById(id): Observable<Profile[]> {
  return this.http.get<Profile[]>(`${this.url}/profile/` + id);
}
}
