import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_TICKER_QUERY = gql`
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
@Injectable({
  providedIn: 'root',
})
export class TickerService {
  constructor(private apollo: Apollo) {}

  getTicker(symbol: string) {
    return this.apollo.watchQuery({
      query: GET_TICKER_QUERY,
      variables: { symbol: symbol },
      pollInterval: 1000,
    });
  }
}
