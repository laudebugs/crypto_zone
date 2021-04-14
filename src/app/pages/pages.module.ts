import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../components/components.module';
import { Material } from 'src/libs/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material,
    ChartsModule,
    NgxChartsModule,
    ComponentsModule,
  ],
  exports: [],
})
export class PagesModule {}
