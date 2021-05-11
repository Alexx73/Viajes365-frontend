import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog.component';

const routes: Routes = [
  { path: '', component: DeleteDialogComponent },
  {
    path: 'deleteconfirm',
    component: DeleteDialogComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmDialogRoutingModule {}
