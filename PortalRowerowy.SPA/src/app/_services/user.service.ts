import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //baseUrl = 'http://localhost:5000/api/'; 
  baseUrl = environment.apiUrl;

constructor() { }

}
