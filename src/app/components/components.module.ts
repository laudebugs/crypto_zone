import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerComponent } from './ticker/ticker.component';
import { MarketCapComponent } from './market-cap/market-cap.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SupplyOverMaxComponent } from './supply-over-max/supply-over-max.component';

@NgModule({
  declarations: [TickerComponent, MarketCapComponent, SupplyOverMaxComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [MarketCapComponent, TickerComponent, SupplyOverMaxComponent],
})
export class ComponentsModule {}
