import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const COIN_QUERY = gql`
  query GetCon($symbol: String!) {
    getCoin(symbol: $symbol) {
      symbol
      status
      name
      logo_url
      high
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private apollo: Apollo) {}

  getcoin(symbol: string) {
    return this.apollo.watchQuery({
      query: COIN_QUERY,
      variables: { symbol: symbol },
    });
  }
}
