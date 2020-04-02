import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/_models/adventure';
import { AdventureService } from 'src/app/_services/adventure.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-adventure-list',
  templateUrl: './adventure-list.component.html',
  styleUrls: ['./adventure-list.component.css']
})
export class AdventureListComponent implements OnInit {

  adventures: Adventure[];
  addAdventureMode = false;


  // adventure: Adventure = JSON.parse(localStorage.getItem('adventure'));
  typeBicycleList = [{ value: 'Wszystkie', display: 'Wszystkie' },
  { value: 'Górski', display: 'Górski' },
  { value: 'Szosowy', display: 'Szosowy' },
  { value: 'Miejski', display: 'Miejski' },
  { value: 'Elektryczny', display: 'Elektryczny' }];

  adventureParams: any = {};

  pagination: Pagination;

  constructor(private adventureService: AdventureService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventures = data.adventures.result;
      this.pagination = data.adventures.pagination;
      this.adventureParams.orderBy = 'Distance';

    });
    this.adventureParams.typeBicycle = 'Wszystkie';
    this.adventureParams.minDistance = 0;
    this.adventureParams.maxDistance = 5000;

  }

  addAdventureToggle() {
    this.addAdventureMode = true;
  }

  cancelAddAdventureMode(addAdventureMode: boolean) {
    this.addAdventureMode = addAdventureMode;
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.adventureParams.orderBy = 'Distance';
    this.loadAdventures();
  }

  resetFilters() {
  this.adventureParams.typeBicycle = 'Wszystkie';
  this.adventureParams.minDistance = 0;
  this.adventureParams.maxDistance = 10000;
  this.loadAdventures();
}

  loadAdventures() {
     this.adventureService.getAdventures(this.pagination.currentPage, this.pagination.itemsPerPage, this.adventureParams)
      .subscribe((res: PaginationResult<Adventure[]>) => {
       this.adventures = res.result;
       this.pagination = res.pagination;
     }, error => {
       this.alertify.error(error);
     });
   }


  // loadAdventures() {
  //   this.adventureService.getAdventures().subscribe((adventures: Adventure[]) => {
  //     this.adventures = adventures;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }



}
