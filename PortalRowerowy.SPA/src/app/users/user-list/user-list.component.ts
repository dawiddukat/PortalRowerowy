import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  user: User = JSON.parse(localStorage.getItem('user'));

  genderList = [{ value: 'Wszystkie', display: 'Wszystkie' },
  { value: 'mężczyzna', display: 'Mężczyźni' },
  { value: 'kobieta', display: 'Kobiety' }];

  typeBicycleList = [{ value: 'Wszystkie', display: 'Wszystkie' },
  { value: 'MTB', display: 'Górski' },
  { value: 'ROAD', display: 'Szosowy' },
  { value: 'CITY', display: 'Miejski' },
  { value: 'EBIKE', display: 'Elektryczny' }];

  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      // this.loadUsers();
    });

    this.userParams.gender = 'Wszystkie';
    this.userParams.typeBicycle = 'Wszystkie';
    this.userParams.minAge = 0;
    this.userParams.maxAge = 100;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = 'Wszystkie';
    this.userParams.typeBicycle = 'Wszystkie';
    this.userParams.minAge = 0;
    this.userParams.maxAge = 100;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
