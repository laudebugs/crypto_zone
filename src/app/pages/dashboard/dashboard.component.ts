import { NomicsService } from './../../../services/nomics.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';
import { multi } from '../../components/ticker/data';
import { Coin } from 'src/services/Models/Coin';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedCoin: Coin;
  coins: Coin[] = [
    { name: 'BTC' },
    { name: 'ETH' },
    { name: 'LTC' },
    { name: 'XMR' },
    { name: 'XRP' },
    { name: 'DOGE' },
  ];
  selectedData = [];
  constructor(private location: Location) {
    this.selectedCoin = this.coins[0];
    const path = this.location.path().substr(1);
    if (path.length > 0) {
      const selected = this.coins.find((coin) => coin.name === path);
      this.selectedCoin = selected;
    }
  }

  ngOnInit(): void {}

  selectCoin(coin: Coin) {
    this.selectedCoin = coin;
    this.location.replaceState(`/${this.selectedCoin.name}`);
  }
}
