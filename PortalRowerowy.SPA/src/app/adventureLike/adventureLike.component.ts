import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Adventure } from '../_models/Adventure';
import { AdventureService } from '../_services/adventure.service';

@Component({
  selector: 'app-adventureLike',
  templateUrl: './adventureLike.component.html',
  styleUrls: ['./adventureLike.component.css']
})
export class AdventureLikeComponent implements OnInit {
  adventures: Adventure[];
  pagination: Pagination;
  adventureLikeParams: string;

  // tslint:disable-next-line: max-line-length
  constructor(private adventureService: AdventureService, private route: ActivatedRoute, private alertify: AlertifyService) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventures = data.adventures.result;
      this.pagination = data.adventures.pagination;
    });
    this.adventureLikeParams = 'UserLikesAdventure';
  }
  loadAdventures() {
    this.adventureService.getAdventures(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.adventureLikeParams)
      .subscribe((res: PaginationResult<Adventure[]>) => {
        this.adventures = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAdventures();
  }
}