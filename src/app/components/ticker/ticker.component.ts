import {
  TickerService,
} from '../../../services/ticker.service';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { NomicsService } from 'src/services/nomics.service';
import { multi } from './data';
import { SnapShot } from 'src/services/Models/SnapShot';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
})
export class TickerComponent implements OnInit, OnDestroy {
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
    private tickerService: TickerService,
  ) {
    
  }

  ngOnInit(): void {
    console.log(this.selected);
    this.data = [{ name: this.selected, series: [] }];
    this.makeNewSubscription()
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
   console.log(changes)
    if (!changes.firstChange) {
      this.subscription.unsubscribe()
      // Make a new subscription to the data 
      this.makeNewSubscription()
      
    }
  }

  makeNewSubscription() {
    this.subscription = this.getTickData().subscribe(
      ({ data, loadin }: any) => {
        console.log(data);

        const series = data.getSnapShots.map((point) => {
          return this.parse(point);
        });
        const parsedData = [{ name: this.selected, series: series }];
        this.data = [...parsedData];
      }
    );
  }
  
  getTickData(coin?:string) {
    return this.tickerService.getTicker(coin || this.selected).valueChanges;
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

 
  parse(coin: any) {
    const date = new Date(coin.price_timestamp);
    const point = {
      name: date,
      value: Math.floor(coin.price),
    };

    return point;
  }

  
  // Chart functions
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
