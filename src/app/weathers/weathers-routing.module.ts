import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherEditorComponent } from './weather-editor.component';
import { WeathersListComponent } from './weathers-list.component';

const routes: Routes = [
    { path: '', component: WeathersListComponent },
    { path: 'weatherslist', component: WeathersListComponent, pathMatch: 'full' },
    {
        path: 'weather-editor/:id',
        component: WeatherEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WeathersRoutingModule { }