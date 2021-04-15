import { Coin } from 'src/services/Models/Coin';
import { TickerService } from '../../../services/ticker.service';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { NomicsService } from 'src/services/nomics.service';
import { multi } from './data';
import { SnapShot } from 'src/services/Models/SnapShot';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
})
export class TickerComponent implements OnInit {
  @Input()
  selected!: string;

  view: [number, number] = [600, 400];
  multi: any[] = multi;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = false;
  data = [];
  snapshots: SnapShot[] = [];
  subscription: Subscription;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  constructor(
    private nomicsService: NomicsService,
    private tickerService: TickerService
  ) {}

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (!!changes.selected.previousValue) {
      // this.subscription.unsubscribe();
    }
    console.log(changes);
    this.subscription?.unsubscribe();
    this.data = [{ name: changes.selected.currentValue.name, series: [] }];
    this.snapshots = [];
    this.subscription = this.getTickData().subscribe(
      ({ data, loading }: any) => {
        console.log(data.getSnapShots[0].symbol);
        data.getSnapShots
          .slice(this.snapshots.length)
          .map((point: SnapShot) => {
            const newData = {
              name: new Date(point.price_timestamp),
              value: point.price,
            };
            const tempData = this.data;
            tempData[0].series.push(newData);
            this.data = [...tempData];
            this.snapshots.push(point);
          });
      }
    );
  }

  getTickData() {
    return this.tickerService.getTicker(this.selected).valueChanges;
  }
  ngOnInit(): void {
    console.log(this.selected);
    this.data = [{ name: this.selected, series: [] }];
    this.subscription = this.getTickData().subscribe(
      ({ data, loading }: any) => {
        console.log(data.getSnapShots[0].symbol);

        data.getSnapShots
          .slice(this.snapshots.length)
          .map((point: SnapShot) => {
            const newData = {
              name: new Date(point.price_timestamp),
              value: point.price,
            };
            const tempData = this.data;
            tempData[0].series.push(newData);
            this.data = [...tempData];
            this.snapshots.push(point);
          });
      }
    );

    // this.nomicsService.getCurrencyTicker().subscribe((result: any) => {
    //   console.log(result);
    //   result.forEach((data: any) => {
    //     const point = this.parse(data);

    //     const thisCoinIndx = this.data.findIndex(
    //       (item) => item.name == data.id
    //     );
    //     let dataPoint = this.data[thisCoinIndx];

    //     dataPoint.series.push(point);
    //   });
    //   console.log(this.data);
    //   this.data = [...this.data];
    // });

    // interval(60000)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => this.nomicsService.getCurrencyTicker())
    //   )
    //   .subscribe((result: any) => {
    //     console.log(result);
    //     result.map((coin: any) => {
    //       const date = new Date(coin.price_timestamp);
    //       const minutes =
    //         date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

    //       const thisCoinIndx = this.data.findIndex(
    //         (item) => item.name == coin.id
    //       );
    //       let dataPoint = this.data[thisCoinIndx];
    //       const point = {
    //         name: date,
    //         value: Math.floor(coin.price),
    //       };
    //       dataPoint.series.push(point);

    //       // this.data[thisCoinIndx] = dataPoint;

    //       this.data[thisCoinIndx] = dataPoint;
    //       this.data = [...this.data];
    //       // console.log(this.data);

    //       console.log(JSON.stringify(this.data));
    //     });
    //   });
  }
  parse(coin: any) {
    const date = new Date(coin.price_timestamp);
    const point = {
      name: date,
      value: Math.floor(coin.price),
    };

    return point;
  }
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
