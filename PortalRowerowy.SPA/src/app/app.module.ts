import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { FriendsComponent } from './friends/friends.component';
import { MessagesComponent } from './messages/messages.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { SellbicyclesComponent } from './sellbicycles/sellbicycles.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';


export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent,
      FriendsComponent,
      MessagesComponent,
      NewsComponent,
      EventsComponent,
      AdventuresComponent,
      SellbicyclesComponent,
      UserCardComponent,
      UserDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:50000/api/auth']
         }
      }),
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
   

   ],   
   providers: [
      AuthService, 
      AlertifyService,
      UserService,
      AuthGuard,
      UserDetailResolver,
      UserListResolver,
      {
         provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig 
     },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
