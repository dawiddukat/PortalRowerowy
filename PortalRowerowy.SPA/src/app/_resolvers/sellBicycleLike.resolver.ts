
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Adventure } from '../_models/Adventure';
import { AdventureService } from '../_services/adventure.service';
import { SellBicycle } from '../_models/SellBicycle';
import { SellBicycleService } from '../_services/sellBicycle.service';

@Injectable()
export class SellBicycleLikeResolver implements Resolve<SellBicycle[]> {
    pageNumber = 1;
    pageSize = 12;
    sellBicycleLikeParams = 'UserLikesSellBicycle';
    constructor(private sellBicycleService: SellBicycleService,
                private router: Router,
                private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<SellBicycle[]> {
        return this.sellBicycleService.getSellBicycles(this.pageNumber, this.pageSize, null, this.sellBicycleLikeParams).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }

}