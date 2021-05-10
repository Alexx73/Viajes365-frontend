import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TermsAndConditionsComponent } from './home/terms-and-conditions/terms-and-conditions.component';

// Modules defs
const accountModule = () =>
  import('./account/account.module').then((m) => m.AccountModule);
const adminModule = () =>
  import('./admin/admin.module').then((m) => m.AdminModule);
const usersModule = () =>
  import('./users/users.module').then((m) => m.UsersModule);
const forumModule = () =>
  import('./forum/forum.module').then((m) => m.ForumModule);
const attractionsModule = () =>
  import('./attractions/attractions.module').then((m) => m.AttractionsModule);
const toursModule = () =>
  import('./tours/tours.module').then((m) => m.ToursModule);
const citiesModule = () =>
  import('./cities/cities.module').then((m) => m.CitiesModule);
const chatModule = () =>
  import('./chat/chat.module').then((m) => m.ChatModule);
const rolesModule = () =>
  import('./roles/roles.module').then((m) => m.RolesModule);
const locationsModule = () =>
  import('./locations/locations.module').then((m) => m.LocationsModule);
const photosModule = () =>
  import('./photos/photos.module').then((m) => m.PhotosModule);
const weathersModule = () =>
  import('./weathers/weathers.module').then((m) => m.WeathersModule);

const routes: Routes = [
  // static home page
  { path: '', component: HomeComponent },
  
  // modules redirections
  { path: 'login', redirectTo: 'account/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'account/register', pathMatch: 'full' },
  { path: 'dasboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'forum', redirectTo: 'forum/topiclist', pathMatch: 'full' },
  { path: 'attractions', redirectTo: 'attractions/attractionslist', pathMatch: 'full' },
  { path: 'tours', redirectTo: 'tours/tourslist', pathMatch: 'full' },
  { path: 'cities', redirectTo: 'cities/citieslist', pathMatch: 'full' },
  { path: 'chats', redirectTo: 'chats/chatslist', pathMatch: 'full' },
  { path: 'roles', redirectTo: 'roles/roleslist', pathMatch: 'full' },
  { path: 'locations', redirectTo: 'locations/locationslist', pathMatch: 'full' },
  { path: 'photos', redirectTo: 'photos/photoslist', pathMatch: 'full' },
  { path: 'weathers', redirectTo: 'weathers/weatherslist', pathMatch: 'full' },

  // child loadings
  { path: 'account', loadChildren: accountModule, pathMatch: 'prefix' },
  { path: 'admin', loadChildren: adminModule, pathMatch: 'prefix' },
  { path: 'users', loadChildren: usersModule, pathMatch: 'prefix' },
  { path: 'forum', loadChildren: forumModule, pathMatch: 'prefix' },
  { path: 'attractions', loadChildren: attractionsModule, pathMatch: 'prefix' },
  { path: 'tours', loadChildren: toursModule, pathMatch: 'prefix' },
  { path: 'cities', loadChildren: citiesModule, pathMatch: 'prefix' },
  { path: 'chats', loadChildren: chatModule, pathMatch: 'prefix' },
  { path: 'roles', loadChildren: rolesModule, pathMatch: 'prefix' },
  { path: 'locations', loadChildren: locationsModule, pathMatch: 'prefix' },
  { path: 'photos', loadChildren: photosModule, pathMatch: 'prefix' },
  { path: 'weathers', loadChildren: weathersModule, pathMatch: 'prefix' },
  
  // static page
  {
    path: 'termsandconditions',
    component: TermsAndConditionsComponent,
    pathMatch: 'full',
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
