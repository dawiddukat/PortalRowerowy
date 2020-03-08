
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Adventure } from '../_models/Adventure';
import { AdventureService } from '../_services/adventure.service';

@Injectable()
export class AdventureListResolver implements Resolve<Adventure[]> {


    // pageNumber = 1;
    // pageSize = 12;

    constructor(private adventureService: AdventureService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Adventure[]> {
        return this.adventureService.getAdventures(/*this.pageNumber, this.pageSize*/).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}