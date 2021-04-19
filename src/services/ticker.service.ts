import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export const GET_TICKER_QUERY = gql`
  query GetSnapshots($symbol: String!) {
    getSnapShots(symbol: $symbol) {
      symbol
      price
      price_timestamp
      price_date
      marketCap
    }
  }
`;

export const TICKER_SUB = gql`
  subscription ListenSnapshots {
    listenSnapshots {
      symbol
      price
      marketCap
      circulating_supply
      price_date
      price_timestamp
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class TickerService {
  constructor(private apollo: Apollo) {}

  getTicker(symbol: string) {
    return this.apollo.watchQuery({
      query: GET_TICKER_QUERY,
      variables: { symbol: symbol },
      pollInterval: 30 * 1000,
    });
  }
}
