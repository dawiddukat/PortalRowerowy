import { Component, OnInit, Input } from '@angular/core';
import { UserPhoto } from '../../_models/userPhoto';

@Component({
  selector: 'app-userPhotos',
  templateUrl: './userPhotos.component.html',
  styleUrls: ['./userPhotos.component.css']
})
export class UserPhotosComponent implements OnInit {


  @Input() userPhotos: UserPhoto[];

  constructor() { }

  ngOnInit() {
  }

}
