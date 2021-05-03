import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
@NgModule({
  declarations: [LayoutComponent, DashboardComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
