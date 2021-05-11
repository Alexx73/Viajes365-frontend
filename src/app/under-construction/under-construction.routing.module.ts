import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderConstructionComponent } from './underconstruction.component';

const routes: Routes = [
  { path: '', component: UnderConstructionComponent },
  {
    path: 'infopage',
    component: UnderConstructionComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnderConstructionRoutingModule {}
