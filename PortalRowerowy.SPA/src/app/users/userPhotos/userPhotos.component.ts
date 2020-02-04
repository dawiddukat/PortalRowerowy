import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserPhoto } from '../../_models/userphoto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-userPhotos',
  templateUrl: './userPhotos.component.html',
  styleUrls: ['./userPhotos.component.css']
})
export class UserPhotosComponent implements OnInit {


  @Input() userPhotos: UserPhoto[];
  @Output() getUserPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: UserPhoto;



  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: UserPhoto = JSON.parse(response);
        const userPhoto = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.userPhotos.push(userPhoto);
      }
    };
  }

  setMainUserPhoto(userPhoto: UserPhoto) {
    this.userService.setMainUserPhoto(this.authService.decodedToken.nameid, userPhoto.id).subscribe(() => {
      console.log('Sukces, zdjęcie ustawione jako główne!');
      this.currentMain = this.userPhotos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      userPhoto.isMain = true;
      this.getUserPhotoChange.emit(userPhoto.url);
    },
      error => {
        this.alertify.error(error);
      });
  }
}
