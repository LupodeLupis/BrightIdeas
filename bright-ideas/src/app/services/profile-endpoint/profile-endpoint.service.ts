import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../../models/profile";

@Injectable({
  providedIn: "root"
})
export class ProfileEndpointService {
  private url = "https://bright-ideas-api.herokuapp.com";

  constructor(private http: HttpClient) {}

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}/profiles`);
  }

  getProfileById(id): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}/profile/` + id);
  }
}
