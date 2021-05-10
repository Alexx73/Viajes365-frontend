import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesListComponent } from './cities-list.component';
import { CityEditorComponent } from './city-editor.component';
import { CitiesRoutingModule } from './cities-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CitiesListComponent, CityEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CitiesRoutingModule,
  ]
})
export class CitiesModule { }
