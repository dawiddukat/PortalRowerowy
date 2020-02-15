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
import { AdventuresComponent } from './adventures/adventures.component';
import { SellBicyclesComponent } from './sellbicycles/sellbicycles.component';
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
      AdventuresComponent,
      SellBicyclesComponent,
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
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
