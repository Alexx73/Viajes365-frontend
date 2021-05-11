import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionComponent } from './underconstruction.component';
import { UnderConstructionRoutingModule } from './under-construction.routing.module';

@NgModule({
  declarations: [UnderConstructionComponent],
  imports: [CommonModule, UnderConstructionRoutingModule],
})
export class UnderConstructionModule {}
