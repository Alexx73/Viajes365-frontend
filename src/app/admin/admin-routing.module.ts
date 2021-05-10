import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [

    { path: '', component: LayoutComponent },
    { path: 'dashboard', component: LayoutComponent, pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [RouterModule]
})
export class AdminRoutingModule { }