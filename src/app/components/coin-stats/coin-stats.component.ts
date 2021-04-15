import { Component, Input, OnInit } from '@angular/core';
import { CoinService } from 'src/services/coin.service';
import { Coin } from 'src/services/Models/Coin';

@Component({
  selector: 'app-coin-stats',
  templateUrl: './coin-stats.component.html',
  styleUrls: ['./coin-stats.component.scss'],
})
export class CoinStatsComponent implements OnInit {
  @Input()
  coin!: Coin;
  constructor() {}

  ngOnInit(): void {
    console.log(this.coin);
  }
}
