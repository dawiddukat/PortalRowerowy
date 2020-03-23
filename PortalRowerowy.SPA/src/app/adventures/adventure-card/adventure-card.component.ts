import { Component, OnInit, Input } from '@angular/core';
import { Adventure } from 'src/app/_models/adventure';
import { AuthService } from 'src/app/_services/auth.service';
import { AdventureService } from 'src/app/_services/adventure.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-adventure-card',
  templateUrl: './adventure-card.component.html',
  styleUrls: ['./adventure-card.component.css']
})
export class AdventureCardComponent implements OnInit {

  @Input() adventure: Adventure;

  constructor(private authService: AuthService,
    private adventureService: AdventureService,
    private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendAdventureLike(this.authService.decodedToken.nameid, id)
      .subscribe(data => {
        this.alertify.success('Polubiłeś: ' + this.adventure.adventureName + '!');
      }, error => {
        this.alertify.error('Już nie lubisz tej wyprawy!');
      });
  }

  // sendLike(id: number) {
  //   this.userService.sendLike(this.authService.decodedToken.nameid, id)
  //     .subscribe(data => {
  //       this.alertify.success('Polubiłeś: ' + this.adventure.adventureName[0].toUpperCase()
  //         + this.adventure.adventureName.slice(1) + '!');
  //     }, error => {
  //       this.alertify.error(error);
  //     });
  // }
}
