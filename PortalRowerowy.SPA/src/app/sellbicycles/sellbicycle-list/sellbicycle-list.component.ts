import { Component, OnInit } from '@angular/core';
import { SellBicycle } from 'src/app/_models/sellBicycle';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-SellBicycle-List',
  templateUrl: './SellBicycle-List.component.html',
  styleUrls: ['./SellBicycle-List.component.css']
})
export class SellBicycleListComponent implements OnInit {

  sellBicycles: SellBicycle[];

  constructor(private sellBicycleService: SellBicycleService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadSellBicycles();
  }


  loadSellBicycles() {
    this.sellBicycleService.getSellBicycles().subscribe((sellBicycles: SellBicycle[]) => {
      this.sellBicycles = sellBicycles;
    }, error => {
      this.alertify.error(error);
    });
  }
}
