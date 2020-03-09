import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { Adventure } from '../_models/Adventure';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUrl = 'http://localhost:5000/api/auth/';
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  userPhotoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentUserPhotoUrl = this.userPhotoUrl.asObservable();

  currentAdventure: Adventure;
  adventurePhotoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentAdventurePhotoUrl = this.adventurePhotoUrl.asObservable();

  constructor(private http: HttpClient) { }


  changeUserPhoto(photoUrl: string) {
    this.userPhotoUrl.next(photoUrl);
  }

  changeAdventurePhoto(photoUrl: string) {
    this.adventurePhotoUrl.next(photoUrl);
  }


  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          // console.log(this.decodedToken);
          this.changeUserPhoto(this.currentUser.photoUrl);
        }

      }));
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
