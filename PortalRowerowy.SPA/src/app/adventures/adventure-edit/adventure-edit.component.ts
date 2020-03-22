import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
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
  photoUrl: string;


  // photoUrl: string;
  @ViewChild('editForm', null) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotfication($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private adventureService: AdventureService,
              ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventure = data.adventure;
    });
    // this.adventureService.photoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }

  updateAdventure() {
    this.adventureService.updateAdventure(this.adventure.id, this.adventure)
      .subscribe(next => {
        this.alertify.success('Profil pomyślnie zaktualizowano');
        this.editForm.reset(this.adventure); },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
        this.alertify.error(error);
      }
      );
  }

  updateMainAdventurePhoto(photoUrl) {
    this.adventure.photoUrl = photoUrl;
  }

}
