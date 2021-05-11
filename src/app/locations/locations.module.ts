import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list.component';
import { LocationEditorComponent } from './location-editor.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LocationsListComponent, LocationEditorComponent, LocationEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocationsRoutingModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class LocationsModule { }
