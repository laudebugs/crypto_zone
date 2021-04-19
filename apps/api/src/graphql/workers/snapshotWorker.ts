const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");

import { IRawCurrencyTicker } from "nomics";
import nomicsClient from "../../clients/nomics";
import CryptoCurrency, { CryptoModel } from "../../models/CryptoCurrency";
import { IntervalModel } from "../../models/Interval";
import Snapshot, { SnapshotModel } from "../../models/Snapshot";
import { emmiter, pubsub, pusher, SnapShotPubSub } from "../pubsub";
import { gql } from "apollo-server";
import CryptoCurrencyResolver from "../resolvers/CryptoCurrencyResolver";
import { Resolver } from "type-graphql";
const scheduler = new ToadScheduler();

const SNAPSHOT_MUTATION = gql`
  mutation NewSnapshot($snapshot: Snapshot!) {
    newSnapshot(snapshot: $snapshot)
  }
`;

const cryptoResolver: CryptoCurrencyResolver = new CryptoCurrencyResolver();

const tick = async () => {
  return await nomicsClient.currenciesTicker({
    /*
    Specify the interval for interval data in return
    One or more strings can be provided. If not provided, **all** are used.
    The intervals specified will affect what is returned in the response (see below)
  */
    interval: ["1d", "7d", "30d", "365d", "ytd"],
    //   Limit the returned currencies to the ones in the following array. If not
    //   specified, **all** will be returned
    // */
    ids: ["BTC", "ETH", "LTC", "XMR", "DOGE", "XRP"],
    /*
    Specify the currency to quote all returned prices in
  */
    convert: "USD", // defaults to "USD"
  });
};

const task = new AsyncTask(
  "ticking currencies",
  () => {
    return tick().then((result) => {
      parseData(result);
    });
  },
  (error: Error) => {
    console.log(error.message);
  }
);

const job = new SimpleIntervalJob({ seconds: 30 }, task);

export const scheduleSnapShots = () => {
  scheduler.addSimpleIntervalJob(job);
};

const parseData = async (data: IRawCurrencyTicker[]) => {
  data.forEach(async (coin: any) => {
    let thisCoin = await CryptoModel.findOne({
      symbol: coin.symbol,
    });
    if (!!thisCoin) {
      const snapshot: Snapshot = await SnapshotModel.create({
        symbol: coin.symbol,
        price: coin.price,
        marketCap: coin.market_cap,
        circulating_supply: coin.circulating_supply,
        price_date: coin.price_date,
        price_timestamp: coin.price_timestamp,
      });

      thisCoin.snapshots.push(snapshot);
      if (thisCoin.snapshots.length > 240) thisCoin.snapshots.shift();

      pubsub.publish("SNAPSHOT", snapshot);

      const interval = coin["1d"];
      const oneDayInterval = await IntervalModel.create({
        volume: interval.volume,
        price_change: interval.price_change,
        price_change_pct: interval.price_change_pct,
        volume_change: interval.volume_change,
        volume_change_pct: interval.volume_change_pct,
        market_cap_change: interval.market_cap_change,
        market_cap_change_pct: interval.market_cap_change_pct,
      });
      thisCoin.day.push(oneDayInterval);

      const interval7d = coin["7d"];
      const sevenDayInterval = await IntervalModel.create({
        volume: interval7d.volume,
        price_change: interval7d.price_change,
        price_change_pct: interval7d.price_change_pct,
        volume_change: interval7d.volume_change,
        volume_change_pct: interval7d.volume_change_pct,
        market_cap_change: interval7d.market_cap_change,
        market_cap_change_pct: interval7d.market_cap_change_pct,
      });
      thisCoin.week.push(sevenDayInterval);

      const interval30d = coin["30d"];
      const thirtyDayInterval = await IntervalModel.create({
        volume: interval30d.volume,
        price_change: interval30d.price_change,
        price_change_pct: interval30d.price_change_pct,
        volume_change: interval30d.volume_change,
        volume_change_pct: interval30d.volume_change_pct,
        market_cap_change: interval30d.market_cap_change,
        market_cap_change_pct: interval30d.market_cap_change_pct,
      });
      thisCoin.month.push(thirtyDayInterval);

      const interval365d = coin["365d"];
      const yearInterval = await IntervalModel.create({
        volume: interval365d.volume,
        price_change: interval365d.price_change,
        price_change_pct: interval365d.price_change_pct,
        volume_change: interval365d.volume_change,
        volume_change_pct: interval365d.volume_change_pct,
        market_cap_change: interval365d.market_cap_change,
        market_cap_change_pct: interval365d.market_cap_change_pct,
      });
      thisCoin.year.push(yearInterval);

      const intervalytd = coin["ytd"];
      const ytdInterval = await IntervalModel.create({
        volume: intervalytd.volume,
        price_change: intervalytd.price_change,
        price_change_pct: intervalytd.price_change_pct,
        volume_change: intervalytd.volume_change,
        volume_change_pct: intervalytd.volume_change_pct,
        market_cap_change: intervalytd.market_cap_change,
        market_cap_change_pct: intervalytd.market_cap_change_pct,
      });
      thisCoin.ytd.push(ytdInterval);
    } else {
      thisCoin = await CryptoModel.create({
        symbol: coin.symbol,
        currency: coin.currency,
        name: coin.name,
        logo_url: coin.logo_url,
        status: coin.status,
        num_exchanges: coin.num_exchanges,
        num_pairs: coin.num_pairs,
        num_pairs_unmapped: coin.num_pairs_unmapped,
        first_candle: coin.first_candle,
        first_order_book: coin.first_order_book,
        rank: coin.rank,
        rank_delta: coin.rank_delta,
        high: coin.high,
        high_timestamp: coin.high_timestamp,
        day: [],
        week: [],
        month: [],
        year: [],
        ytd: [],
        snapshots: [],
      });
      const snapshot = await SnapshotModel.create({
        symbol: coin.symbol,
        price: coin.price,
        marketCap: coin.market_cap,
        circulating_supply: coin.circulating_supply,
        price_date: coin.price_date,
        price_timestamp: coin.price_timestamp,
      });
      thisCoin.snapshots.push(snapshot);
      if (thisCoin.snapshots.length > 240) thisCoin.snapshots.shift();

      pubsub.publish("listenSnapshots", snapshot);

      const interval = coin["1d"];
      const oneDayInterval = await IntervalModel.create({
        volume: interval.volume,
        price_change: interval.price_change,
        price_change_pct: interval.price_change_pct,
        volume_change: interval.volume_change,
        volume_change_pct: interval.volume_change_pct,
        market_cap_change: interval.market_cap_change,
        market_cap_change_pct: interval.market_cap_change_pct,
      });
      thisCoin.day.push(oneDayInterval);

      const interval7d = coin["7d"];
      const sevenDayInterval = await IntervalModel.create({
        volume: interval7d.volume,
        price_change: interval7d.price_change,
        price_change_pct: interval7d.price_change_pct,
        volume_change: interval7d.volume_change,
        volume_change_pct: interval7d.volume_change_pct,
        market_cap_change: interval7d.market_cap_change,
        market_cap_change_pct: interval7d.market_cap_change_pct,
      });
      thisCoin.week.push(sevenDayInterval);

      const interval30d = coin["30d"];
      const thirtyDayInterval = await IntervalModel.create({
        volume: interval30d.volume,
        price_change: interval30d.price_change,
        price_change_pct: interval30d.price_change_pct,
        volume_change: interval30d.volume_change,
        volume_change_pct: interval30d.volume_change_pct,
        market_cap_change: interval30d.market_cap_change,
        market_cap_change_pct: interval30d.market_cap_change_pct,
      });
      thisCoin.month.push(thirtyDayInterval);

      const interval365d = coin["365d"];
      const yearInterval = await IntervalModel.create({
        volume: interval365d.volume,
        price_change: interval365d.price_change,
        price_change_pct: interval365d.price_change_pct,
        volume_change: interval365d.volume_change,
        volume_change_pct: interval365d.volume_change_pct,
        market_cap_change: interval365d.market_cap_change,
        market_cap_change_pct: interval365d.market_cap_change_pct,
      });
      thisCoin.year.push(yearInterval);

      const intervalytd = coin["ytd"];
      const ytdInterval = await IntervalModel.create({
        volume: intervalytd.volume,
        price_change: intervalytd.price_change,
        price_change_pct: intervalytd.price_change_pct,
        volume_change: intervalytd.volume_change,
        volume_change_pct: intervalytd.volume_change_pct,
        market_cap_change: intervalytd.market_cap_change,
        market_cap_change_pct: intervalytd.market_cap_change_pct,
      });
      thisCoin.ytd.push(ytdInterval);
    }
    thisCoin.save().then((coin) => console.log("saved: ", coin.symbol));
  });
};
