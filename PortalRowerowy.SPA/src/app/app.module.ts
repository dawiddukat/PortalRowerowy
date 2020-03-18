import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, TabsModule, BsDatepickerModule, ButtonsModule, PaginationModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';

import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';

import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { UserPhotosComponent } from './users/userPhotos/userPhotos.component';
import { MainPipe } from './_pipes/main-pipe.module';
import { FriendsResolver } from './_resolvers/friends.resolver';
import { FriendsComponent } from './friends/friends.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { UserMessagesComponent } from './users/user-messages/user-messages.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AdventureListComponent } from './adventures/adventure-list/adventure-list.component';
import { AdventureCardComponent } from './adventures/adventure-card/adventure-card.component';
import { AdventureDetailComponent } from './adventures/adventure-detail/adventure-detail.component';

import { SellBicycleListComponent } from './sellbicycles/sellbicycle-list/sellbicycle-list.component';
import { SellBicycleCardComponent } from './sellbicycles/sellbicycle-card/sellbicycle-card.component';
import { SellBicycleDetailComponent } from './sellbicycles/sellbicycle-detail/sellbicycle-detail.component';
import { AdventureDetailResolver } from './_resolvers/adventure-detail.resolver';
import { AdventureListResolver } from './_resolvers/adventure-list.resolver';
import { SellBicycleDetailResolver } from './_resolvers/sellBicycle-detail.resolver';
import { SellBicycleListResolver } from './_resolvers/sellBicycle-list.resolver';
import { AdventureEditResolver } from './_resolvers/adventure-edit.resolver';
import { AdventureEditComponent } from './adventures/adventure-edit/adventure-edit.component';
import { SellBicycleEditComponent } from './sellbicycles/sellbicycle-edit/sellbicycle-edit.component';
import { SellBicycleEditResolver } from './_resolvers/sellBicycle-edit.resolver';
import { AdventurePhotosComponent } from './adventures/adventurePhotos/adventurePhotos.component';
import { SellBicyclePhotosComponent } from './sellbicycles/sellbicyclePhotos/sellbicyclePhotos.component';
import { AdventureCardEditComponent } from './adventures/adventure-card-edit/adventure-card-edit.component';
import { SellBicycleCardEditComponent } from './sellbicycles/sellbicycle-card-edit/sellbicycle-card-edit.component';
import { AddAdventureComponent } from './adventures/adventure-add/adventure-add.component';


export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
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

      AdventureListComponent,
      AdventureCardComponent,
      AdventureDetailComponent,
      AdventureEditComponent,
      AdventurePhotosComponent,
      AddAdventureComponent,

      AdventureCardEditComponent,


      SellBicycleListComponent,
      SellBicycleCardComponent,
      SellBicycleDetailComponent,
      SellBicycleEditComponent,
      SellBicyclePhotosComponent,

      SellBicycleCardEditComponent,


      UserCardComponent,
      UserDetailComponent,
      UserEditComponent,
      UserPhotosComponent,
      UserMessagesComponent

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      BsDatepickerModule.forRoot(),
      FileUploadModule,
      ButtonsModule.forRoot(),
      MainPipe,
      PaginationModule.forRoot()
   ],
   providers: [
      AuthService,
      AlertifyService,
      UserService,
      AuthGuard,
      UserDetailResolver,
      UserListResolver,
      FriendsResolver,
      MessagesResolver,
      ErrorInterceptorProvider,
      {
         provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig
      },
      UserEditResolver,
      PreventUnsavedChanges,
      
      AdventureDetailResolver,
      AdventureListResolver,
      AdventureEditResolver,

      SellBicycleListResolver,  
      SellBicycleDetailResolver,
      SellBicycleEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
