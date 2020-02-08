import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

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
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    },
    this.createRegisterForm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator); // zastąpienie przez metodę createRegisterForm
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['male'],
      dateOfBirth: [null, Validators.required],
      typeBicycle: ['', Validators.required],
      country: ['', Validators.required],
      voivodeship: ['', Validators.required],
      city: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { missmatch: true };
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