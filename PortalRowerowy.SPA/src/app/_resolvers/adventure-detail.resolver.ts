
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdventureService } from '../_services/adventure.service';
import { Adventure } from '../_models/Adventure';

@Injectable()
export class AdventureDetailResolver implements Resolve<Adventure> {

    constructor(private adventureService: AdventureService, 
                private router: Router,
                private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Adventure> {
        return this.adventureService.getAdventure(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem z pobraniem danych');
                this.router.navigate(['/wyprawy']);
                return of(null);
            })
        );
    }
}