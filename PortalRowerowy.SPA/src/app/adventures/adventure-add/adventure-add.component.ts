import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Adventure } from 'src/app/_models/Adventure';
import { AdventureService } from 'src/app/_services/adventure.service';

@Component({
  selector: 'app-adventure-add',
  templateUrl: './adventure-add.component.html',
  styleUrls: ['./adventure-add.component.css']
})
export class AddAdventureComponent implements OnInit {

  // @Input() valuesFromHome: any;
  @Output() cancelAddAdventure = new EventEmitter();
  adventure: Adventure;
  adventureAddForm: FormGroup;
  formControlName: FormGroup;

  bsConfig: Partial<BsDatepickerConfig>;

  typeBicycleList = [
    { value: 'Górski', display: 'Górski' },
    { value: 'Szosowy', display: 'Szosowy' },
    { value: 'Miejski', display: 'Miejski' },
    { value: 'Elektryczny', display: 'Elektryczny' }];
  adventureParams: any = {};

  constructor(private adventureService: AdventureService,
              private alertify: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    },
      this.createAddAdventureForm();
}

  createAddAdventureForm() {
    this.adventureAddForm = this.fb.group({
      adventureName: ['', Validators.required],
      typeBicycle: ['', Validators.required],
    });
  }



  addAdventure() {
    if (this.adventureAddForm.valid) {
      this.adventure = Object.assign({}, this.adventureAddForm.value);

      this.adventureService.addAdventure(this.adventure).subscribe((adventure: Adventure) => {
        this.alertify.success('Wyprawa dodana!');
        this.router.navigate(['/wyprawy/' + adventure.id + '/edycja']);

      }, error => {
        this.alertify.error(error);
      }, () => {

      });
    }
  }


    cancel() {
      this.cancelAddAdventure.emit(false);
      this.alertify.message('Anulowano');
    }
  }
