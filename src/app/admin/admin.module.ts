import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LayoutComponent, DashboardComponent, SidebarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class AdminModule { }
