import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { NewsComponent } from './news/news.component';

import { MessagesComponent } from './messages/messages.component';

import { EventsComponent } from './events/events.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { FriendsResolver } from './_resolvers/friends.resolver';
import { FriendsComponent } from './friends/friends.component';
import { MessagesResolver } from './_resolvers/messages.resolver';

import { AdventureListComponent } from './adventures/adventure-list/adventure-list.component';
import { SellBicycleListComponent } from './sellbicycles/sellbicycle-list/sellbicycle-list.component';

import { AdventureDetailComponent } from './adventures/adventure-detail/adventure-detail.component';
import { SellBicycleDetailComponent } from './sellbicycles/sellbicycle-detail/sellbicycle-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'uzytkownicy', component: UserListComponent, resolve: { users: UserListResolver } }, // canActivate: [AuthGuard] },
            { path: 'przyjaciele', component: FriendsComponent, resolve: { users: FriendsResolver } },

            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownik/edycja', component: UserEditComponent, resolve: { user: UserEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } }, // canActivate: [AuthGuard]  },
            { path: 'wydarzenia', component: EventsComponent }, // canActivate: [AuthGuard]  },
            { path: 'news', component: NewsComponent }, // canActivate: [AuthGuard]  },
            { path: 'wyprawy', component: AdventureListComponent }, // canActivate: [AuthGuard]  },
            { path: 'wyprawy/:id', component: AdventureDetailComponent},
            { path: 'wiadomości', component: MessagesComponent, resolve: {messages: MessagesResolver} }, // canActivate: [AuthGuard]  },
            { path: 'giełda', component: SellBicycleListComponent }, // canActivate: [AuthGuard]  },
            { path: 'giełda/:id', component: SellBicycleDetailComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
