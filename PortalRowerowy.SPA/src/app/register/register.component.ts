import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('Podaj nazwę użytkownika', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', Validators.required )
    });
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success("Rejestracja udana");
    // }, error => {
    //   this.alertify.error("Wystąpił błąd rejestracji!");
    // });
    console.log(this.registerForm.value);

  }

  cancel() {
    this.cancelRegister.emit(false);
    // error notification
    // Shorthand for:
    // alertify.notify( message, 'error', [wait, callback]);
    this.alertify.message("Anulowano");
  }

}
