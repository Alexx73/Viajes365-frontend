import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursEditorComponent } from './tours-editor.component';
import { ToursListComponent } from './tours-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToursRoutingModule } from './tours-routing.module';

@NgModule({
  declarations: [ToursEditorComponent, ToursListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToursRoutingModule,
  ]
})
export class ToursModule { }
