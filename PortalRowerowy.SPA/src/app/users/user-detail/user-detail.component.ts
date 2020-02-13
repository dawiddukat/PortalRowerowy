import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Adventure } from 'src/app/_models/Adventure';
import { TimeAgoPipe } from '../../_pipes/time-ago-pipe';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @ViewChild('userTabs', { static: true }) userTabs: TabsetComponent;
  user: User;
  adventure: Adventure;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryAdventures: NgxGalleryImage[];

  constructor(private userService: UserService,
    // tslint:disable-next-line: align
    private alertify: AlertifyService,
    // tslint:disable-next-line: align
    private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line: comment-format
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.adventure = data.adventure;
    });

    this.route.queryParams.subscribe(params => {
      const selectTab = params.tab;
      this.userTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        preview: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        /*    },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {*/
        // breakpoint: 400,
      }
    ];

    this.galleryImages = this.getImages();
    this.galleryAdventures = this.getAdventures();
    /* {
         small: 'assets/1-small.jpg',
         medium: 'assets/1-medium.jpg',
         big: 'assets/1-big.jpg'
     },
     {
         small: 'assets/2-small.jpg',
         medium: 'assets/2-medium.jpg',
         big: 'assets/2-big.jpg'
     },
     {
         small: 'assets/3-small.jpg',
         medium: 'assets/3-medium.jpg',
         big: 'assets/3-big.jpg'
     }*/
  }

  getImages() {
    const imagesUrls = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.user.userPhotos.length; i++) {
      imagesUrls.push({
        small: this.user.userPhotos[i].url,
        medium: this.user.userPhotos[i].url,
        big: this.user.userPhotos[i].url,
        descriptio: this.user.userPhotos[i].description,
      });
    }
    return imagesUrls;
    // loadUser() {
    //   this.userService.getUser(+this.route.snapshot.params.id).
    //   subscribe((user: User) => {
    //     this.user = user;
    //   }, error => {
    //     this.alertify.error(error);
    //   });
    // }

  }
  



getAdventures() {
    const adventuresUrls = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.user.adventures.length; i++) {
      adventuresUrls.push({
        small: this.user.adventures[i].url,
        medium: this.user.adventures[i].url,
        big: this.user.adventures[i].url,
        descriptio: this.user.adventures[i].description,
      });
    }
    return adventuresUrls;
    // loadUser() {
    //   this.userService.getUser(+this.route.snapshot.params.id).
    //   subscribe((user: User) => {
    //     this.user = user;
    //   }, error => {
    //     this.alertify.error(error);
    //   });
    // }

  }

  selectTab(tabId: number) {
    this.userTabs.tabs[tabId].active = true;
  }
}
