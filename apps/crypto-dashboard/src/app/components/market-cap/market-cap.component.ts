import { Component, OnInit } from '@angular/core';
import { NomicsService } from 'src/services/nomics.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { Apollo, QueryRef } from 'apollo-angular';
import { SnapShot } from 'src/services/Models/SnapShot';
import { GET_TICKER_QUERY, TICKER_SUB } from 'src/services/ticker.service';
import { Coin } from 'src/services/Models/Coin';

@Component({
  selector: 'app-market-cap',
  templateUrl: './market-cap.component.html',
  styleUrls: ['./market-cap.component.scss'],
})
export class MarketCapComponent implements OnInit {
  view: [number, number] = [600, 300];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  snapShotQuery: QueryRef<SnapShot>;
  data = [];
  constructor(private nomicService: NomicsService, private apollo: Apollo) {
    const data = [];
    // Object.assign(this, { single });

    this.nomicService.getCurrencyTicker().subscribe((results: any) => {
      console.log(results);
      results.map((coin) => {
        data.push({
          name: coin.name,
          value: +coin.market_cap,
          symbol: coin.id,
        });
      });
      this.data = [...data];
      console.log(this.data);
    });
    this.snapShotQuery = apollo.watchQuery({
      query: GET_TICKER_QUERY,
    });
  }
  ngOnInit() {
    this.subToLiveData();
  }

  subToLiveData() {
    this.snapShotQuery.subscribeToMore({
      document: TICKER_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newData = subscriptionData.data.listenSnapshots;
        const tempData = this.data;
        console.log(newData);
        console.log(tempData);
        const indx = tempData.findIndex((ele) => ele.symbol == newData.symbol);
        if (indx === -1) {
          tempData.push({ name: newData.symbol, value: newData.marketCap });
        } else {
          tempData[indx] = {
            name: tempData[indx].name,
            symbol: newData.symbol,
            value: newData.marketCap,
          };
        }
        console.log(tempData);
        this.data = [...tempData];

        console.log(this.data);

        return prev;
      },
    });
  }

  onSelect(event) {
    console.log(event);
  }

  labelFormatting(c) {
    return `${c.label}`;
  }

  formatValue(value) {
    if (value > Math.pow(10, 12)) {
        return`$${(value / Math.pow(10, 12)).toFixed(3)}T`;
    }
    else if (value > Math.pow(10, 9)) {
        return`$${(value / Math.pow(10, 9)).toFixed(2)}B`;
    }
    else if (value > Math.pow(10, 6)) {
        return`$${(value / Math.pow(10, 6)).toFixed(2)}M`;
    }

    return `$${value}`;
  }
}
