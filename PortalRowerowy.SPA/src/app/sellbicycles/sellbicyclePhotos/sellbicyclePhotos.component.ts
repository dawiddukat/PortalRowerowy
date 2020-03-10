import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdventurePhoto } from 'src/app/_models/adventurePhoto';
import { Adventure } from 'src/app/_models/Adventure';
import { ActivatedRoute } from '@angular/router';
import { AdventureService } from 'src/app/_services/adventure.service';
import { SellBicyclePhoto } from 'src/app/_models/sellBicyclePhoto';
import { SellBicycle } from 'src/app/_models/SellBicycle';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sellbicyclePhotos',
  templateUrl: './sellbicyclePhotos.component.html',
  styleUrls: ['./sellbicyclePhotos.component.css']
})
export class SellBicyclePhotosComponent implements OnInit {


  @Input() sellBicyclePhotos: SellBicyclePhoto[];
  sellBicycle: SellBicycle;

  @Output() getAdventurePhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: SellBicyclePhoto;



  constructor(private route: ActivatedRoute, private authService: AuthService, private adventureService: SellBicycleService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sellBicycle = data.sellBicycle;
    });
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'sellbicycles/' + this.sellBicycle.id + '/photos',
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
        const res: SellBicyclePhoto = JSON.parse(response);
        const sellBicyclePhoto = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.sellBicyclePhotos.push(sellBicyclePhoto);
        if (sellBicyclePhoto.isMain) {
          this.authService.changeSellBicyclePhoto(sellBicyclePhoto.url);
          this.authService.currentSellBicycle.photoUrl = sellBicyclePhoto.url;
          localStorage.setItem('sellBicycle', JSON.stringify(this.authService.currentSellBicycle));

        }
      }
    };
  }

  // setMainAdventurePhoto(adventurePhoto: UserPhoto) {
  //   this.userService.setMainUserPhoto(this.authService.decodedToken.nameid, adventurePhoto.id).subscribe(() => {
  //     console.log('Sukces, zdjęcie ustawione jako główne!');
  //     this.currentMain = this.adventurePhotos.filter(p => p.isMain === true)[0];
  //     this.currentMain.isMain = false;
  //     adventurePhoto.isMain = true;
  //     // this.getUserPhotoChange.emit(userPhoto.url);
  //     this./*authService.*/changeAdventurePhoto(adventurePhoto.url);
  //     this./*authService.*/currentAdventure.photoUrl = adventurePhoto.url;
  //     localStorage.setItem('adventure', JSON.stringify(this.authService.currentUser));
  //   },
  //     error => {
  //       this.alertify.error(error);
  //     });
  // }

  // deletePhoto(id: number) {
  //   this.alertify.confirm('Czy jesteś pewien, czy chcesz usunąć zdjęcie?', () => {
  //     this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
  //       this.adventurePhotos.splice(this.adventurePhotos.findIndex(p => p.id === id), 1);
  //       this.alertify.success('Zdjęcie zostało usunięte!');
  //     }, error => {
  //       this.alertify.error('Nie udało się usunąć zdjęcia!');
  //     });
  //   });
  // }
}
