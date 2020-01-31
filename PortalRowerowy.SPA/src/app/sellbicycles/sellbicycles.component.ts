import { Component, OnInit } from '@angular/core';
import { SellBicycle } from 'src/app/_models/sellBicycle';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-sellbicycles',
  templateUrl: './sellbicycles.component.html',
  styleUrls: ['./sellbicycles.component.css']
})
export class SellBicyclesComponent implements OnInit {

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
