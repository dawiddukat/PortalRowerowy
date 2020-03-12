import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/_models/adventure';
import { AdventureService } from 'src/app/_services/adventure.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-adventure-list',
  templateUrl: './adventure-list.component.html',
  styleUrls: ['./adventure-list.component.css']
})
export class AdventureListComponent implements OnInit {

  adventures: Adventure[];
  pagination: Pagination;

  constructor(private adventureService: AdventureService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventures = data.adventures.result;
      this.pagination = data.adventures.pagination;
    });
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAdventures();
  }

  loadAdventures() {
     this.adventureService.getAdventures(this.pagination.currentPage, this.pagination.itemsPerPage)
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



// import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/_models/user';
// import { UserService } from 'src/app/_services/user.service';
// import { AlertifyService } from 'src/app/_services/alertify.service';
// import { ActivatedRoute } from '@angular/router';
// import { Pagination, PaginationResult } from 'src/app/_models/pagination';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './adventure-list.component.html',
//   styleUrls: ['./adventure-list.component.css']
// })
// export class AdventureListComponent implements OnInit {

//   users: User[];

//   user: User = JSON.parse(localStorage.getItem('user'));

//   genderList = [{ value: 'Wszystkie', display: 'Wszystkie' },
//   { value: 'mężczyzna', display: 'Mężczyźni' },
//   { value: 'kobieta', display: 'Kobiety' }];

//   typeBicycleList = [{ value: 'Wszystkie', display: 'Wszystkie' },
//   { value: 'MTB', display: 'Górski' },
//   { value: 'ROAD', display: 'Szosowy' },
//   { value: 'CITY', display: 'Miejski' },
//   { value: 'EBIKE', display: 'Elektryczny' }];

//   userParams: any = {};
//   pagination: Pagination;

//   constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

//   ngOnInit() {

//     this.route.data.subscribe(data => {
//       this.users = data.users.result;
//       this.pagination = data.users.pagination;
//       // this.loadUsers();
//     });

//     this.userParams.gender = 'Wszystkie';
//     this.userParams.typeBicycle = 'Wszystkie';
//     this.userParams.minAge = 0;
//     this.userParams.maxAge = 100;
//     this.userParams.orderBy = 'LastActive';
//   }

//   pageChanged(event: any): void {
//     this.pagination.currentPage = event.page;
//     this.loadUsers();
//   }

//   resetFilters() {
//     this.userParams.gender = 'Wszystkie';
//     this.userParams.typeBicycle = 'Wszystkie';
//     this.userParams.minAge = 0;
//     this.userParams.maxAge = 100;
//     this.userParams.orderBy = 'LastActive';
//     this.loadUsers();
//   }

//   loadUsers() {
//     this.userService.getUsers(this.pagination.currentPage,
//       this.pagination.itemsPerPage, this.userParams)
//       .subscribe((res: PaginationResult<User[]>) => {
//         this.users = res.result;
//         this.pagination = res.pagination;
//       }, error => {
//         this.alertify.error(error);
//       });
//   }
// }
