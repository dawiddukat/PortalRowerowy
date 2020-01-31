import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { FriendsComponent } from './friends/friends.component';
import { NewsComponent } from './news/news.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { MessagesComponent } from './messages/messages.component';
import { SellbicyclesComponent } from './sellbicycles/sellbicycles.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'uzytkownicy', component: UserListComponent, resolve: { users: UserListResolver } }, // canActivate: [AuthGuard] },
            { path: 'przyjaciele', component: FriendsComponent },
            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownik/edycja', component: UserEditComponent, resolve: { user: UserEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } }, // canActivate: [AuthGuard]  },
            { path: 'wydarzenia', component: EventsComponent }, // canActivate: [AuthGuard]  },
            { path: 'news', component: NewsComponent }, // canActivate: [AuthGuard]  },
            { path: 'wyprawy', component: AdventuresComponent }, // canActivate: [AuthGuard]  },
            { path: 'wiadomości', component: MessagesComponent }, // canActivate: [AuthGuard]  },
            { path: 'giełda', component: SellbicyclesComponent }, // canActivate: [AuthGuard]  },
]
    },
{ path: '**', redirectTo: '', pathMatch: 'full' }
];
