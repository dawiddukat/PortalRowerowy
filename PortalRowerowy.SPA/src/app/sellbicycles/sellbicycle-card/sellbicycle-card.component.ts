import { Component, OnInit, Input } from '@angular/core';
import { SellBicycle } from 'src/app/_models/sellBicycle';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sellbicycle-card',
  templateUrl: './sellbicycle-card.component.html',
  styleUrls: ['./sellbicycle-card.component.css']
})
export class SellBicycleCardComponent implements OnInit {

  @Input() sellBicycle: SellBicycle;

  constructor(private authService: AuthService,
    private sellBicycleService: SellBicycleService,
    private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendSellBicycleLike(this.authService.decodedToken.nameid, this.sellBicycle.id)
      .subscribe(data => {
        this.alertify.success('Obserwujesz: ' + this.sellBicycle.sellBicycleName + '!');
      }, error => {
        this.alertify.error(error);
      });
  }

  // sendLike(id: number) {
  //   this.userService.sendLike(this.authService.decodedToken.nameid, id)
  //     .subscribe(data => {
  //       this.alertify.success('Polubiłeś: ' + this.sellBicycle.sellBicycleName[0].toUpperCase()
  //         + this.sellBicycle.sellBicycleName.slice(1) + '!');
  //     }, error => {
  //       this.alertify.error(error);
  //     });
  // }
}
