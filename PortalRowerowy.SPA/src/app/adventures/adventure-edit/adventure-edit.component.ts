import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { error } from 'protractor';
import { Adventure } from 'src/app/_models/Adventure';
import { AdventureService } from 'src/app/_services/adventure.service';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.css']
})
export class AdventureEditComponent implements OnInit {

  adventure: Adventure;
  // photoUrl: string;
  @ViewChild('editForm', null) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotfication($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private adventureService: AdventureService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventure = data.adventure;
    });
    // this.authService.currentUserPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateAdventure() {
    this.adventureService.updateAdventure(this.authService.decodedToken.nameid, this.adventure)
      .subscribe(next => {
        this.alertify.success('Profil pomyślnie zaktualizowano');
        this.editForm.reset(this.adventure); },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
        this.alertify.error(error);
      }
      );
  }

  // updateMainUserPhoto(userPhotoUrl) {
  //   this.user.photoUrl = userPhotoUrl;

  // }

}
