import { Component, OnInit } from '@angular/core';
import { NomicsService } from 'src/services/nomics.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
@Component({
  selector: 'app-market-cap',
  templateUrl: './market-cap.component.html',
  styleUrls: ['./market-cap.component.scss'],
})
export class MarketCapComponent implements OnInit {
  single: any[];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private nomicService: NomicsService) {
    const data = [];
    Object.assign(this, { single });

    this.nomicService.getCurrencyTicker().subscribe((results: any) => {
      results.map((coin) => {
        data.push({ name: coin.name, value: +coin.market_cap });
      });
      // console.log(data);
      // console.log(single);
      Object.assign(this, { data });
    });
  }
  ngOnInit() {}

  onSelect(event) {
    console.log(event);
  }

  labelFormatting(c) {
    return `${c.label}`;
  }
}
