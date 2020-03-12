
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SellBicycleService } from '../_services/sellBicycle.service';
import { SellBicycle } from '../_models/SellBicycle';


@Injectable()
export class SellBicycleListResolver implements Resolve<SellBicycle[]> {


    pageNumber = 1;
    pageSize = 12;

    constructor(private sellBicycleService: SellBicycleService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SellBicycle[]> {
        return this.sellBicycleService.getSellBicycles(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }


}