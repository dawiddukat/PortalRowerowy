import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { SellBicycleService } from 'src/app/_services/sellBicycle.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SellBicycle } from 'src/app/_models/SellBicycle';
import { error } from 'protractor';
import { NgxGalleryAnimation, NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-sellbicycle-detail',
  templateUrl: './sellbicycle-detail.component.html',
  styleUrls: ['./sellbicycle-detail.component.css']
})
export class SellBicycleDetailComponent implements OnInit {

  sellBicycle: SellBicycle;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private sellBicycleService: SellBicycleService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sellBicycle = data.sellBicycle;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        preview: false,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = this.getImages();
  }
  // loadSellBicycle() {
  //   this.sellBicycleService.getSellBicycle(+this.route.snapshot.params.id)
  //   .subscribe((sellBicycle: SellBicycle) => {
  //     this.sellBicycle = sellBicycle;
  //   }, error => {
  //     this.alertify.error(error);
  //   })
  // }

  getImages() {
    const imagesUrls = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.sellBicycle.sellBicyclePhotos.length; i++) {
      imagesUrls.push({
        small: this.sellBicycle.sellBicyclePhotos[i].url,
        medium: this.sellBicycle.sellBicyclePhotos[i].url,
        big: this.sellBicycle.sellBicyclePhotos[i].url,
        descriptio: this.sellBicycle.sellBicyclePhotos[i].description,
      });
    }
    return imagesUrls;
  }
}
