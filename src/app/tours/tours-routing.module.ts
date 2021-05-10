import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToursEditorComponent } from './tours-editor.component';
import { ToursListComponent } from './tours-list.component';

const routes: Routes = [
    { path: '', component: ToursListComponent },
    { path: 'tourslist', component: ToursListComponent, pathMatch: 'full' },
    {
        path: 'tour-editor/:id',
        component: ToursEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToursRoutingModule { }