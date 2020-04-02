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
import { AdventureDetailResolver } from './_resolvers/adventure-detail.resolver';
import { AdventureListResolver } from './_resolvers/adventure-list.resolver';
import { SellBicycleListResolver } from './_resolvers/sellBicycle-list.resolver';
import { SellBicycleDetailResolver } from './_resolvers/sellBicycle-detail.resolver';
import { AdventureEditComponent } from './adventures/adventure-edit/adventure-edit.component';
import { AdventureEditResolver } from './_resolvers/adventure-edit.resolver';
import { SellBicycleEditComponent } from './sellbicycles/sellbicycle-edit/sellbicycle-edit.component';
import { SellBicycleEditResolver } from './_resolvers/sellBicycle-edit.resolver';
import { AdventureLikeComponent } from './adventureLike/adventureLike.component';
import { AdventureLikeResolver } from './_resolvers/adventureLike.resolver';
import { SellBicycleLikeComponent } from './sellBicycleLike/sellBicycleLike.component';
import { SellBicycleLikeResolver } from './_resolvers/sellBicycleLike.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'uzytkownicy', component: UserListComponent, resolve: { users: UserListResolver } }, // canActivate: [AuthGuard] },
            { path: 'przyjaciele', component: FriendsComponent, resolve: { users: FriendsResolver } },

            { path: 'polubione_wyprawy', component: AdventureLikeComponent, resolve: { adventures: AdventureLikeResolver } },
            { path: 'obserwowane_rowery', component: SellBicycleLikeComponent, resolve: { sellBicycles: SellBicycleLikeResolver } },

            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownik/edycja', component: UserEditComponent, resolve: { user: UserEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            // tslint:disable-next-line: max-line-length
            { path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } }, // canActivate: [AuthGuard]  },
            
            { path: 'wydarzenia', component: EventsComponent }, // canActivate: [AuthGuard]  },
            { path: 'news', component: NewsComponent }, // canActivate: [AuthGuard]  },
            
            { path: 'wyprawy', component: AdventureListComponent, resolve: { adventures: AdventureListResolver } }, // canActivate: [AuthGuard]  },
            { path: 'wyprawy/:id', component: AdventureDetailComponent, resolve: { adventure: AdventureDetailResolver }},
            { path: 'wyprawy/:id/edycja', component: AdventureEditComponent, resolve: { adventure: AdventureEditResolver }, canDeactivate: [PreventUnsavedChanges] },

            { path: 'wiadomości', component: MessagesComponent, resolve: {messages: MessagesResolver} }, // canActivate: [AuthGuard]  },
           
            { path: 'giełda', component: SellBicycleListComponent, resolve: { sellBicycles: SellBicycleListResolver }  }, // canActivate: [AuthGuard]  },
            { path: 'giełda/:id', component: SellBicycleDetailComponent, resolve: { sellBicycle: SellBicycleDetailResolver } },
            { path: 'giełda/:id/edycja', component: SellBicycleEditComponent, resolve: { sellBicycle: SellBicycleEditResolver }, canDeactivate: [PreventUnsavedChanges] },

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
