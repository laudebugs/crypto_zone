import { CryptoModel } from "./../../models/CryptoCurrency";
import { GraphQLError } from "graphql";
import {
  Query,
  Mutation,
  Resolver,
  Arg,
  Subscription,
  Root,
  Args,
} from "type-graphql";

import CryptoCurrency from "../../models/CryptoCurrency";
import Snapshot from "../../models/Snapshot";

@Resolver((of) => CryptoCurrency)
export default class CryptoCurrencyResolver {
  @Query()
  saySth(): String {
    return "Hello";
  }

  @Query((returns) => [Snapshot], { nullable: true })
  async getSnapShots(
    @Arg("ticker") symbol: string
  ): Promise<Snapshot[] | GraphQLError> {
    try {
      const crypto: CryptoCurrency = await CryptoModel.findOne({
        symbol: symbol,
      });

      return crypto.snapshots;
    } catch (error) {
      return new GraphQLError(error);
    }
  }

  @Subscription({
    topics: "SNAPSHOT",
  })
  listenSnapshots(@Root() payload: Snapshot): Snapshot {
    return { ...payload };
  }
}
