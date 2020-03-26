import { Component, OnInit, Input } from '@angular/core';
import { Adventure } from 'src/app/_models/adventure';
import { AuthService } from 'src/app/_services/auth.service';
import { AdventureService } from 'src/app/_services/adventure.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-adventure-card-edit',
  templateUrl: './adventure-card-edit.component.html',
  styleUrls: ['./adventure-card-edit.component.css']
})
export class AdventureCardEditComponent implements OnInit {

  @Input() adventure: Adventure;
  user: User[];
  adventures: Adventure[];

  constructor(private authService: AuthService,
    private adventureService: AdventureService,
    private alertify: AlertifyService) { }

  ngOnInit() {
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

    deleteAdventure(id: number) {
    this.alertify.confirm('Czy jesteś pewien, czy chcesz usunąć zdjęcie?', () => {
      this.adventureService.deleteAdventure(/*this.authService.decodedToken.nameid*/this.adventure.id).subscribe(() => {
        this.adventures.splice(this.adventures.findIndex(p => p.id === id), 1);
        this.alertify.success('Zdjęcie zostało usunięte!');
      }, error => {
        this.alertify.error('Nie udało się usunąć zdjęcia!');
      });
    });
  }
}
