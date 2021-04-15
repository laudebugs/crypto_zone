import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerComponent } from './ticker/ticker.component';
import { MarketCapComponent } from './market-cap/market-cap.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SupplyOverMaxComponent } from './supply-over-max/supply-over-max.component';
import { CoinStatsComponent } from './coin-stats/coin-stats.component';

@NgModule({
  declarations: [
    TickerComponent,
    MarketCapComponent,
    SupplyOverMaxComponent,
    CoinStatsComponent,
  ],
  imports: [CommonModule, NgxChartsModule],
  exports: [
    MarketCapComponent,
    TickerComponent,
    SupplyOverMaxComponent,
    CoinStatsComponent,
  ],
})
export class ComponentsModule {}
