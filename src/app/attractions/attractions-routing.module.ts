import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttractionsEditorComponent } from './attractions-editor.component';
import { AttractionsListComponent } from './attractions-list.component';


const routes: Routes = [
    { path: '', component: AttractionsListComponent },
    { path: 'attractionslist', component: AttractionsListComponent, pathMatch: 'full' },
    {
        path: 'attraction-editor/:id',
        component: AttractionsEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AttractionsRoutingModule { }
