import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SellBicycleService } from '../_services/sellBicycle.service';
import { SellBicycle } from '../_models/SellBicycle';
import { Adventure } from '../_models/Adventure';
@Component({
  selector: 'app-sellbicyclelike',
  templateUrl: './sellBicycleLike.component.html',
  styleUrls: ['./sellBicycleLike.component.css']
})
export class SellBicycleLikeComponent implements OnInit {
  sellBicycles: SellBicycle[];
  adventures: Adventure[];
  pagination: Pagination;
  sellBicycleLikeParams: string;

  // tslint:disable-next-line: max-line-length
  constructor(private sellBicycleService: SellBicycleService, private route: ActivatedRoute, private alertify: AlertifyService) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sellBicycles = data.sellBicycles.result;
      this.pagination = data.sellBicycles.pagination;
    });
    this.sellBicycleLikeParams = 'UserLikesSellBicycle';
  }
  loadSellBicycles() {
    this.sellBicycleService.getSellBicycles(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.sellBicycleLikeParams)
     .subscribe((res: PaginationResult<SellBicycle[]>) => {
      this.sellBicycles = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadSellBicycles();
  }
}

