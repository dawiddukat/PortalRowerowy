import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SellBicycle } from 'src/app/_models/SellBicycle';
import { error } from 'protractor';

@Component({
  selector: 'app-sellbicycle-detail',
  templateUrl: './sellbicycle-detail.component.html',
  styleUrls: ['./sellbicycle-detail.component.css']
})
export class SellBicycleDetailComponent implements OnInit {

  sellBicycle: SellBicycle;

  constructor(private sellBicycleService: SellBicycleService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadSellBicycle();
  }

  loadSellBicycle() {
    this.sellBicycleService.getSellBicycle(+this.route.snapshot.params.id)
    .subscribe((sellBicycle: SellBicycle) => {
      this.sellBicycle = sellBicycle;
    }, error => {
      this.alertify.error(error);
    })
  }

}
