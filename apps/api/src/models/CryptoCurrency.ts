import { Field, ObjectType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Interval } from "./Interval";
import Snapshot from "./Snapshot";

@ObjectType()
export default class CryptoCurrency {
  @Field()
  @prop()
  public currency?: string;

  @Field()
  @prop()
  public symbol?: string;

  @Field()
  @prop()
  public name?: string;

  @Field()
  @prop()
  public logo_url?: string;

  @Field()
  @prop()
  public status?: string;

  @Field()
  @prop()
  public market_cap?: number;

  @Field()
  @prop()
  public num_exchanges?: number;

  @Field()
  @prop()
  public num_pairs?: number;

  @Field()
  @prop()
  public num_pairs_unmapped?: number;

  @Field()
  @prop()
  public first_candle?: Date;

  @Field()
  @prop()
  public first_trade?: Date;

  @Field()
  @prop()
  public first_order_book?: Date;

  @Field()
  @prop()
  public rank?: number;

  @Field()
  @prop()
  public rank_delta?: number;

  @Field()
  @prop()
  public high?: number;

  @Field()
  @prop()
  public high_timestamp?: Date;

  @Field((type) => [Snapshot])
  @prop({ type: () => Snapshot, default: [] })
  public snapshots?: Snapshot[];
  // @Field((type)=> Id)
  // id: Id

  @Field((type) => [Interval])
  @prop({ type: () => Interval, default: [] })
  public "1d"?: Interval[];

  @Field((type) => [Interval])
  @prop({ type: () => Interval, default: [] })
  public "7d"?: Interval[];

  @Field((type) => [Interval])
  @prop({ type: () => Interval, default: [] })
  public "30d"?: Interval[];

  @Field((type) => [Interval])
  @prop({ type: () => Interval, default: [] })
  public "365"?: Interval[];

  @Field((type) => [Interval])
  @prop({ type: () => Interval, default: [] })
  public "ytd"?: Interval[];
}

export const CryptoModel = getModelForClass(CryptoCurrency);
