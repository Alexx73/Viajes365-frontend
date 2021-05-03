import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TermsAndConditionsComponent } from './home/terms-and-conditions/terms-and-conditions.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', redirectTo: 'account/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'account/register', pathMatch: 'full' },
  { path: 'dasboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'termsandconditions', component: TermsAndConditionsComponent, pathMatch: 'full' },
  { path: 'account', loadChildren: accountModule, pathMatch: 'prefix' },
  { path: 'admin', loadChildren: adminModule, pathMatch: 'prefix' },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }