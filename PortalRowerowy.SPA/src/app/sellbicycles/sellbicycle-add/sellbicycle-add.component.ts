import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Adventure } from 'src/app/_models/Adventure';
import { AdventureService } from 'src/app/_services/adventure.service';
import { SellBicycle } from 'src/app/_models/SellBicycle';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';

@Component({
  selector: 'app-sellbicycle-add',
  templateUrl: './sellbicycle-add.component.html',
  styleUrls: ['./sellbicycle-add.component.css']
})
export class AddSellBicycleComponent implements OnInit {

  // @Input() valuesFromHome: any;
  @Output() cancelAddSellBicycle = new EventEmitter();
  sellBicycle: SellBicycle;
  sellBicycleAddForm: FormGroup;
  formControlName: FormGroup;

  bsConfig: Partial<BsDatepickerConfig>;

  typeBicycleList = [
    { value: 'Górski', display: 'Górski' },
    { value: 'Szosowy', display: 'Szosowy' },
    { value: 'Miejski', display: 'Miejski' },
    { value: 'Elektryczny', display: 'Elektryczny' }];
  sellBicycleParams: any = {};

  constructor(private sellBicycleService: SellBicycleService,
              private alertify: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    },
      this.createAddSellBicycleForm();
}

  createAddSellBicycleForm() {
    this.sellBicycleAddForm = this.fb.group({
      sellBicycleName: ['', Validators.required],
      typeBicycle: ['', Validators.required],
    });
  }



  addSellBicycle() {
    if (this.sellBicycleAddForm.valid) {
      this.sellBicycle = Object.assign({}, this.sellBicycleAddForm.value);

      this.sellBicycleService.addSellBicycle(this.sellBicycle).subscribe((sellBicycle: SellBicycle) => {
        this.alertify.success('Pomyślnie utworzon!');
        this.router.navigate(['/gielda/' + sellBicycle.id + '/edycja']);

      }, error => {
        this.alertify.error(error);
      }, () => {
        // this.adventureService.getAdventure(this.adventure.adventureName).subscribe(() => {
          // this.router.navigate(['/wyprawy/' + this.adventure.adventureName + '/edycja']);

        // });
      });
    }
  }

    cancel() {
      this.cancelAddSellBicycle.emit(false);
      // error notification
      // Shorthand for:
      // alertify.notify( message, 'error', [wait, callback]);
      this.alertify.message('Anulowano');
    }
  }
