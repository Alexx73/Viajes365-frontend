import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeathersListComponent } from './weathers-list.component';
import { WeatherEditorComponent } from './weather-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeathersRoutingModule } from './weathers-routing.module';

@NgModule({
  declarations: [WeathersListComponent, WeatherEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WeathersRoutingModule,
  ]
})
export class WeathersModule { }
