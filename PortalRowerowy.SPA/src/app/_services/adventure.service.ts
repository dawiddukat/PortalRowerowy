import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adventure } from '../_models/adventure';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  // baseUrl = 'http://localhost:5000/api/';
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAdventures(page?, itemsPerPage?, adventureParams?): Observable<PaginationResult<Adventure[]>> {
    const paginationResult: PaginationResult<Adventure[]> = new PaginationResult<Adventure[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);

      // params = params.append('orderBy', adventureParams.orderBy);

    }

    if (adventureParams != null) {
      params = params.append('minDistance', adventureParams.minDistance);
      params = params.append('maxDistance', adventureParams.maxDistance);
      params = params.append('typeBicycle', adventureParams.typeBicycle);
    }

    return this.http.get<Adventure[]>(this.baseUrl + 'adventures', { observe: 'response', params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginationResult;
        })
      );
  }

  getAdventure(id: number): Observable<Adventure> {
    return this.http.get<Adventure>(this.baseUrl + 'adventures/' + id);
  }

  updateAdventure(id: number, adventure: Adventure) {
    return this.http.put(this.baseUrl + 'adventures/' + id, adventure);
  }

  setMainAdventurePhoto(adventureId: number, id: number) {
    return this.http.post(this.baseUrl + 'adventures/' + adventureId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(adventureId: number, id: number) {
    return this.http.delete(this.baseUrl + 'adventures/' + adventureId + '/photos/' + id);
  }
}

