import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success("Rejestracja udana");
    }, error => {
      this.alertify.error("Wystąpił błąd rejestracji!");
    });

  }

  cancel() {
    this.cancelRegister.emit(false);
      // error notification
  // Shorthand for:
  // alertify.notify( message, 'error', [wait, callback]);
    this.alertify.message("Anulowano");
  }

}
