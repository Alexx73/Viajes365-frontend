import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesListComponent } from './cities-list.component';
import { CityEditorComponent } from './city-editor.component';
import { CitiesRoutingModule } from './cities-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CitiesListComponent, CityEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CitiesRoutingModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class CitiesModule { }
