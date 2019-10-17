<<<<<<< HEAD
<<<<<<< HEAD:bright-ideas/src/app/services/profile-endpoint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile'
import { environment } from '../../environments/environment'
=======
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../../models/profile";
>>>>>>> 1dc4cbb0052c5cedc64b0d5e8faa58b69a9c7b49:bright-ideas/src/app/services/profile-endpoint/profile-endpoint.service.ts

@Injectable({
  providedIn: "root"
})
export class ProfileEndpointService {
<<<<<<< HEAD:bright-ideas/src/app/services/profile-endpoint.service.ts

  private url = environment.api;
=======
  private url = "https://bright-ideas-api.herokuapp.com";
>>>>>>> 1dc4cbb0052c5cedc64b0d5e8faa58b69a9c7b49:bright-ideas/src/app/services/profile-endpoint/profile-endpoint.service.ts
=======
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
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac

  constructor(private http: HttpClient) {}

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}/profile`);
  }

  getProfileById(id): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}/profile/` + id);
  }
}
