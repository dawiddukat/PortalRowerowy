
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

@Injectable()
export class AdventureLikeResolver implements Resolve<Adventure[]> {
    pageNumber = 1;
    pageSize = 12;
    adventureLikeParams = 'UserLikesAdventure';
    constructor(private adventureService: AdventureService,
                private router: Router,
                private alertify: AlertifyService) { }
    resolve(router: ActivatedRouteSnapshot): Observable<Adventure[]> {
        return this.adventureService.getAdventures(this.pageNumber, this.pageSize, null, this.adventureLikeParams).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}