import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { SellBicycle } from 'src/app/_models/SellBicycle';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-sellbicycle-edit',
  templateUrl: './sellbicycle-edit.component.html',
  styleUrls: ['./sellbicycle-edit.component.css']
})
export class SellBicycleEditComponent implements OnInit {

  sellBicycle: SellBicycle;
  user: User;
  // photoUrl: string;
  @ViewChild('editForm', null) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotfication($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private sellBicycleService: SellBicycleService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sellBicycle = data.sellBicycle;
    });
    // this.authService.currentUserPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateSellBicycle() {
    this.sellBicycleService.updateSellBicycle(this.sellBicycle.id, this.sellBicycle)
      .subscribe(next => {
        this.alertify.success('Profil pomyślnie zaktualizowano');
        this.editForm.reset(this.sellBicycle);
      },
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
