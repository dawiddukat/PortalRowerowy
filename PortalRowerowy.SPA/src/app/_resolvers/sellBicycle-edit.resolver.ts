
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SellBicycle } from '../_models/SellBicycle';
import { SellBicycleService } from '../_services/sellBicycle.service';


@Injectable()
export class SellBicycleEditResolver implements Resolve<SellBicycle> {

    constructor(private sellBicycleService: SellBicycleService, 
                private router: Router,
                private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SellBicycle> {
        return this.sellBicycleService.getSellBicycle(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['/giełda']);
                return of(null);
            })
        );
    }
}