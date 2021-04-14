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
  PubSub,
  Publisher,
  PubSubEngine,
  InputType,
  Field,
  ArgsType,
} from "type-graphql";

import CryptoCurrency from "../../models/CryptoCurrency";
import Snapshot from "../../models/Snapshot";
import { pubsub } from "../pubsub";

@ArgsType()
class SnapshotArgs extends Snapshot {}
@InputType({ description: "A Snapshot Input" })
class SnapshotInput extends Snapshot {
  @Field()
  public symbol?: string;

  @Field()
  public price?: number;

  @Field()
  public marketCap?: number;

  @Field()
  public circulating_supply?: string;

  @Field()
  public price_date?: Date;

  @Field()
  public price_timestamp?: Date;
}
@Resolver((of) => CryptoCurrency)
export default class CryptoCurrencyResolver {
  work(snapshot: Snapshot) {
    this.newSnapshot(snapshot);
  }
  @Query()
  saySth(): String {
    return "Hello";
  }

  @Query((returns) => [Snapshot], { nullable: true })
  async getSnapShots(
    @Arg("symbol") symbol: string
  ): Promise<Snapshot[] | GraphQLError> {
    try {
      const crypto: CryptoCurrency = await CryptoModel.findOne({
        symbol: symbol,
      });

      return crypto.snapshots.slice(crypto.snapshots.length - 1000);
    } catch (error) {
      return new GraphQLError(error);
    }
  }

  @Mutation((returns) => String)
  async newSnapshot(
    @Arg("snapshot") snapshot: SnapshotInput,
    @PubSub("SNAPSHOT") publish?: Publisher<string>
  ): Promise<Snapshot> {
    // await publish(snapshot);
    console.log(snapshot);

    await publish(JSON.stringify(snapshot));
    await pubsub.publish("SNAPSHOT", { listenSnapshots: snapshot });
    return snapshot;
  }

  @Subscription({
    topics: "SNAPSHOT",
  })
  listenSnapshots(@Root() payload: string): string {
    console.log("here in sub");
    console.log(payload);
    return payload;
  }

  @Subscription((returns) => Snapshot, {
    topics: ["SNAPSHOT"],
    nullable: true,
  })
  subscriptionWithFilterToDynamicTopic(
    @Root() snapshot: Snapshot,
    @Args() args: SnapshotArgs
  ): Snapshot {
    console.log("here");
    return { ...snapshot };
  }
}
