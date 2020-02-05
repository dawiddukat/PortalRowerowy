import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
declare let alertify: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  @Input() user: User;


  model: any = {};

  // tslint:disable-next-line: no-shadowed-variable
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Zalogowałeś się do aplikacji');
    }, error => {
      this.alertify.error('Wystąpił błąd logowania');
    }, () => {
      this.router.navigate(['/uzytkownicy']);
    });
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Zostałeś wylogowany');
    this.router.navigate(['/home']);
  }


}
