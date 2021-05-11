import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ConfirmDialogRoutingModule } from './confirm-dialog.routing.module';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [CommonModule, ConfirmDialogRoutingModule],
})
export class ConfirmDialogModule {}
