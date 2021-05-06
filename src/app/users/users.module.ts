import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ImageCropperModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class UsersModule { }
