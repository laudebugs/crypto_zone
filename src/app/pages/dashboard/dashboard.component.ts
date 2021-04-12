import { NomicsService } from './../../../services/nomics.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';
import { multi } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  view: [number, number] = [700, 300];
  multi: any[] = multi;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;
  data = [
    { name: 'BTC', series: [] },
    { name: 'ETH', series: [] },
    { name: 'LTC', series: [] },
    { name: 'XMR', series: [] },
  ];

  constructor(private nomicsService: NomicsService) {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.nomicsService.getCurrencyTicker())
      )
      .subscribe((result: any) => {
        result.map((coin: any) => {
          const date = new Date(coin.price_timestamp);
          const minutes =
            date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

          const thisCoinIndx = this.data.findIndex(
            (item) => item.name == coin.id
          );
          let dataPoint = this.data[thisCoinIndx];
          dataPoint.series.push({
            name: date,
            value: Math.floor(coin.price),
          });
          this.data[thisCoinIndx] = dataPoint;
          console.log(JSON.stringify(this.data));
        });
      });
    console.log(this.data);
  }

  ngOnInit(): void {}

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
