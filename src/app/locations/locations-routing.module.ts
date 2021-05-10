import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationEditorComponent } from './location-editor.component';
import { LocationsListComponent } from './locations-list.component';

const routes: Routes = [
    { path: '', component: LocationsListComponent },
    { path: 'locationslist', component: LocationsListComponent, pathMatch: 'full' },
    {
        path: 'city-editor/:id',
        component: LocationEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule { }