import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adventure } from '../_models/adventure';


@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  // baseUrl = 'http://localhost:5000/api/';
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAdventures(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.baseUrl + 'adventures');
  }

  getAdventure(id: number): Observable<Adventure> {
    return this.http.get<Adventure>(this.baseUrl + 'adventures/' + id);
  }

  updateAdventure(id: number, adventure: Adventure) {
    return this.http.put(this.baseUrl + 'adventures/' + id, adventure);
  }
}

