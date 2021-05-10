import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoEditorComponent } from './photo-editor.component';
import { PhotosListComponent } from './photos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosRoutingModule } from './photos-routing.module';



@NgModule({
  declarations: [PhotoEditorComponent, PhotosListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PhotosRoutingModule,
  ]
})
export class PhotosModule { }
