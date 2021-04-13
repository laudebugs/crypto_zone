import nomicsClient from "../../clients/nomics";

import finnhubClient from "../../clients/finnhub";
// Crypto exchanges
finnhubClient.cryptoExchanges((error: Error, data: any, response: any) => {
  if (error) {
    console.log(error.message);
  }
  console.log(data);
});

finnhubClient.stockTick(
  "AAPL",
  "2020-03-25",
  500,
  0,
  (error: Error, data: any, response: any) => {
    console.log("here");
    console.error(data);

    if (error) {
      console.log(error.message);
    }
  }
);
