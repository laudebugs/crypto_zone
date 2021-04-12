import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import nomicsClient from './clients/nomics';

const api_key = '2375d18fd6a501e411fecf7df49dedd0';
@Injectable({
  providedIn: 'root',
})
export class NomicsService {
  constructor(private http: HttpClient) {}

  getCurrencyTicker() {
    // console.log('hapa');
    // let currencies;
    // nomicsClient.currenciesTicker().then((data) => (currencies = data));
    // console.log(currencies);

    const string = `https://api.nomics.com/v1/currencies/ticker?key=${api_key}&ids=BTC,ETH,LTC,XMR&1d,30d&convert=USD&per-page=100&page=1`;

    const params = {
      key: api_key,
      ids: `BTC,ETH,LTC`,
    };

    return this.http.get(string);
  }
}
