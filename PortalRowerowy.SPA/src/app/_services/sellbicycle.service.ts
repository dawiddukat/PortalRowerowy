import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellBicycle } from '../_models/sellbicycle';



@Injectable({
  providedIn: 'root'
})
export class SellBicycleService {

  // baseUrl = 'http://localhost:5000/api/';
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSellBicycles(): Observable<SellBicycle[]> {
    return this.http.get<SellBicycle[]>(this.baseUrl + 'sellbicycles');
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

