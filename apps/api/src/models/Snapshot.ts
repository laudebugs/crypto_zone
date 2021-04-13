import { Field, ObjectType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export default class Snapshot {
  @Field()
  @prop()
  public price?: number;

  @Field()
  @prop()
  public marketCap?: number;

  @Field()
  @prop()
  public circulating_supply?: string;

  @Field()
  @prop()
  public price_date?: Date;

  @Field()
  @prop()
  public price_timestamp?: Date;
}

export const SnapshotModel = getModelForClass(Snapshot);
