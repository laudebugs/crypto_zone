import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
@ObjectType()
export class Interval {
  @Field()
  @prop()
  public volume?: number;

  @Field()
  @prop()
  public price_change?: number;

  @Field()
  @prop()
  public price_change_pct?: number;

  @Field()
  @prop()
  public volume_change?: number;

  @Field()
  @prop()
  public volume_change_pct?: number;

  @Field()
  @prop()
  public market_cap_change?: number;

  @Field()
  @prop()
  public market_cap_change_pct?: number;
}

export const IntervalModel = getModelForClass(Interval);
