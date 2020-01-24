import {  Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { UserListComponent } from './users/user-list/user-list.component'
import { FriendsComponent } from './friends/friends.component'
import { NewsComponent } from './news/news.component'
import { AdventuresComponent } from './adventures/adventures.component'
import { MessagesComponent } from './messages/messages.component'
import { SellbicyclesComponent } from './sellbicycles/sellbicycles.component'
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './_guards/auth.guard'

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'użytkownicy', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'przyjaciele', component: FriendsComponent, canActivate: [AuthGuard]  },
    { path: 'wydarzenia', component: EventsComponent, canActivate: [AuthGuard]  },
    { path: 'news', component: NewsComponent, canActivate: [AuthGuard]  },
    { path: 'wyprawy', component: AdventuresComponent, canActivate: [AuthGuard]  },
    { path: 'wiadomości', component: MessagesComponent, canActivate: [AuthGuard]  },
    { path: 'giełda', component: SellbicyclesComponent, canActivate: [AuthGuard]  },
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];