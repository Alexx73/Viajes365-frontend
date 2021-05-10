import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesListComponent } from './cities-list.component';
import { CityEditorComponent } from './city-editor.component';

const routes: Routes = [
    { path: '', component: CitiesListComponent },
    { path: 'citieslist', component: CitiesListComponent, pathMatch: 'full' },
    {
        path: 'city-editor/:id',
        component: CityEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CitiesRoutingModule { }