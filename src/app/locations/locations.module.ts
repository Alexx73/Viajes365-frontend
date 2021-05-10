import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list.component';
import { LocationEditorComponent } from './location-editor.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocationsListComponent, LocationEditorComponent, LocationEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocationsRoutingModule,
  ]
})
export class LocationsModule { }
