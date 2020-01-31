import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, 
              private alertify: AlertifyService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
 
  //  this.galleryOptions = [
  //     {
  //       width: '600px',
  //       height: '400px',
  //       thumbnailsColumns: 4,
  //       imagePercent: 100,
  //       imageAnimation: NgxGalleryAnimation.Slide,
  //       /*    },
  //           // max-width 800
  //           {
  //               breakpoint: 800,
  //               width: '100%',
  //               height: '600px',
  //               imagePercent: 80,
  //               thumbnailsPercent: 20,
  //               thumbnailsMargin: 20,
  //               thumbnailMargin: 20
  //           },
  //           // max-width 400
  //           {*/
  //       breakpoint: 400,
  //       preview: false
  //     }
  //   ];

  //   this.galleryImages = this.getImages();
  //   /* {
  //        small: 'assets/1-small.jpg',
  //        medium: 'assets/1-medium.jpg',
  //        big: 'assets/1-big.jpg'
  //    },
  //    {
  //        small: 'assets/2-small.jpg',
  //        medium: 'assets/2-medium.jpg',
  //        big: 'assets/2-big.jpg'
  //    },
  //    {
  //        small: 'assets/3-small.jpg',
  //        medium: 'assets/3-medium.jpg',
  //        big: 'assets/3-big.jpg'
  //    }*/
  // }

  // getImages() {
  //   const imagesUrls = [];
  //   // tslint:disable-next-line: prefer-for-of
  //   for (let i = 0; i < this.user.userPhotos.length; i++) {
  //     imagesUrls.push({
  //       small: this.user.userPhotos[i].url,
  //       medium: this.user.userPhotos[i].url,
  //       big: this.user.userPhotos[i].url,
  //       descriptio: this.user.userPhotos[i].description,
  //     });
  //   }
  //   return imagesUrls;
  //   // loadUser() {
  //   //   this.userService.getUser(+this.route.snapshot.params.id).
  //   //   subscribe((user: User) => {
  //   //     this.user = user;
  //   //   }, error => {
  //   //     this.alertify.error(error);
  //   //   });
  //   // }

  }
}