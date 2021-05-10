import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoEditorComponent } from './photo-editor.component';
import { PhotosListComponent } from './photos-list.component';

const routes: Routes = [
    { path: '', component: PhotosListComponent },
    { path: 'photoslist', component: PhotosListComponent, pathMatch: 'full' },
    {
        path: 'photo-editor/:id',
        component: PhotoEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhotosRoutingModule { }