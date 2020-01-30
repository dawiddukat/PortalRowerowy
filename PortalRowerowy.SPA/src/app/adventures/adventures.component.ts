import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/_models/adventure';
import { AdventureService } from 'src/app/_services/adventure.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.css']
})
export class AdventuresComponent implements OnInit {

  adventures: Adventure[];

  constructor(private adventureService: AdventureService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAdventures();
  }


  loadAdventures() {
    this.adventureService.getAdventures().subscribe((adventures: Adventure[]) => {
      this.adventures = adventures;
    }, error => {
      this.alertify.error(error);
    });
  }
}
