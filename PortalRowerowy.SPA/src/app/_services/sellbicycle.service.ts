import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellBicycle } from '../_models/sellbicycle';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class SellBicycleService {

  // baseUrl = 'http://localhost:5000/api/';
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSellBicycles(page?, itemsPerPage?): Observable<PaginationResult<SellBicycle[]>> {
    const paginationResult: PaginationResult<SellBicycle[]> = new PaginationResult<SellBicycle[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<SellBicycle[]>(this.baseUrl + 'sellbicycles', { observe: 'response', params })
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

  getSellBicycle(id: number): Observable<SellBicycle> {
    return this.http.get<SellBicycle>(this.baseUrl + 'sellbicycles/' + id);
  }

  updateSellBicycle(id: number, sellBicycle: SellBicycle) {
    return this.http.put(this.baseUrl + 'sellbicycles/' + id, sellBicycle);
  }

  setMainSellBicyclePhoto(sellBicycleId: number, id: number) {
    return this.http.post(this.baseUrl + 'sellBicycles/' + sellBicycleId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(sellBicycleId: number, id: number) {
    return this.http.delete(this.baseUrl + 'sellBicycles/' + sellBicycleId + '/photos/' + id);
  }
}

