import { NomicsService } from './../../../services/nomics.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';
import { multi } from '../../components/ticker/data';
import { Coin } from 'src/services/Models/Coin';
import { Location } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { CoinService } from 'src/services/coin.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
  
export class DashboardComponent implements OnInit {
  selectedCoin!: string;
  coin: Coin = { name: '' };
  coinSub: Subscription;
  coins: Coin[] = [
    { symbol: 'BTC' },
    { symbol: 'ETH' },
    { symbol: 'LTC' },
    { symbol: 'XMR' },
    { symbol: 'XRP' },
    { symbol: 'DOGE' },
  ];
  selectedData = [];
  // static myObservable: Observable<string> = new Observable(res => {
  //   res.next(this.selectedCoin);
  // });


  constructor(
    private location: Location,
    private coinService: CoinService,
    private nomicsService: NomicsService
  ) {
    this.selectedCoin = this.coins[0].symbol;
    const path = this.location.path().substr(1);
    if (path.length > 0) {
      const selected = this.coins.find((coin) => coin.symbol === path);

      this.selectedCoin = selected.symbol;
    }
    console.log(this.selectedCoin);
  }

  ngOnInit(): void {
    console.log(this.selectedCoin);
    this.coinSub = this.nomicsService
      .getCoin(this.selectedCoin)
      .subscribe((data) => {
        this.coin = data[0];
      });

    // this.coinService
    //   .getcoin(this.selectedCoin)
    //   .valueChanges.subscribe(({ data, loading }: any) => {
    //     this.coin = data.getCoin;
    //     console.log(this.coin);
    //   });
  }

  selectCoin(coin: Coin) {



    this.coinSub.unsubscribe();
    this.selectedCoin = coin.symbol;
    this.location.replaceState(`/${this.selectedCoin}`);
    this.coinSub = this.nomicsService
      .getCoin(this.selectedCoin)
      .subscribe((data) => {
        this.coin = data[0];
      });
  }
}
