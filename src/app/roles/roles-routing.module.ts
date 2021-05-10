import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleEditorComponent } from './role-editor.component';
import { RolesListComponent } from './roles-list.component';

const routes: Routes = [
    { path: '', component: RolesListComponent },
    { path: 'roleslist', component: RolesListComponent, pathMatch: 'full' },
    {
        path: 'role-editor/:id',
        component: RoleEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RolesRoutingModule { }