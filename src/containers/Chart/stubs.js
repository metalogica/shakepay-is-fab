export const ratesStub = {
  "CAD_BTC": 0.00002195,
  "BTC_CAD": 45555.82,
  "CAD_ETH": 0.000337795138552343,
  "ETH_CAD": 2960.37,
  "USD_BTC": 0.00002667,
  "BTC_USD": 37481.7,
  "USD_ETH": 0.000410561278323596,
  "ETH_USD": 2435.69,
  "BTC_ETH": 15.389350569405972,
  "ETH_BTC": 0.06498,
  "CAD_USD": 0.82,
  "USD_CAD": 1.21
};

export const historicalRatesCADtoETH = [
  {
    "pair": "CAD_ETH",
    "midMarketRate": 183.23183823440053,
    "createdAt": "2019-03-08T00:00:01.194Z"
  },
  {
      "pair": "CAD_ETH",
      "midMarketRate": 178.07457772140742,
      "createdAt": "2019-03-09T00:00:02.351Z"
  }
];

export const historicalRatesCADtoBTC = [
  {
    "pair": "CAD_BTC",
    "midMarketRate": 10657.125,
    "createdAt": "2018-03-16T00:00:00.000Z"
},
{
    "pair": "CAD_BTC",
    "midMarketRate": 10796.783333333333,
    "createdAt": "2018-03-17T00:00:00.000Z"
},
];

export const txHistoryStub = [
  {
      "createdAt": "2020-04-20T15:49:57.741Z",
      "amount": 100,
      "currency": "CAD",
      "type": "external account",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-04-09T18:31:25.776Z",
      "amount": 495,
      "currency": "CAD",
      "type": "external account",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-04-06T20:34:32.796Z",
      "amount": 0.002,
      "currency": "BTC",
      "type": "external account",
      "direction": "debit",
      "to": {
          "toAddress": "btc:2N2DZtj1SfcGkaeHA72eZAYBrFbyMZoHVmE"
      }
  },
  {
      "createdAt": "2020-03-16T18:30:59.575Z",
      "amount": 0.01,
      "currency": "BTC",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-03-16T18:23:26.696Z",
      "amount": 5.21,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-03-16T18:20:00.253Z",
      "amount": 5.19,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-03-16T16:17:10.951Z",
      "amount": 5.19,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-03-01T08:09:31.970Z",
      "amount": 1,
      "currency": "CAD",
      "type": "external account",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-02-27T20:43:55.676Z",
      "amount": 1,
      "currency": "CAD",
      "type": "external account",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-02-26T17:11:26.953Z",
      "amount": 999,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-02-20T03:06:57.832Z",
      "amount": 18,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-02-20T03:06:57.742Z",
      "amount": 0.00146125,
      "currency": "BTC",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "BTC",
          "amount": 0.00146125
      },
      "to": {
          "currency": "CAD",
          "amount": 18
      }
  },
  {
      "createdAt": "2020-02-07T03:07:52.330Z",
      "amount": 5,
      "currency": "CAD",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "CAD",
          "amount": 5
      },
      "to": {
          "currency": "BTC",
          "amount": 0.00038096
      }
  },
  {
      "createdAt": "2020-02-07T02:58:24.235Z",
      "amount": 5,
      "currency": "CAD",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "CAD",
          "amount": 5
      },
      "to": {
          "currency": "BTC",
          "amount": 0.00038128
      }
  },
  {
      "createdAt": "2020-02-07T02:57:45.790Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-02-06T19:41:13.729Z",
      "amount": 0.001,
      "currency": "BTC",
      "type": "external account",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-02-05T18:12:35.277Z",
      "amount": 1,
      "currency": "ETH",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "ETH",
          "amount": 1
      },
      "to": {
          "currency": "CAD",
          "amount": 259
      }
  },
  {
      "createdAt": "2020-02-05T16:44:27.835Z",
      "amount": 6,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-02-05T16:37:52.675Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-02-05T11:53:35.095Z",
      "amount": 0.3,
      "currency": "ETH",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "ETH",
          "amount": 0.3
      },
      "to": {
          "currency": "CAD",
          "amount": 75.6
      }
  },
  {
      "createdAt": "2020-02-05T00:32:07.449Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-02-04T21:01:07.261Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-02-04T19:26:52.041Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "debit",
      "to": {}
  },
  {
      "createdAt": "2020-01-31T18:36:43.459Z",
      "amount": 5,
      "currency": "CAD",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "CAD",
          "amount": 5
      },
      "to": {
          "currency": "BTC",
          "amount": 0.00040243
      }
  },
  {
      "createdAt": "2020-01-31T17:57:43.953Z",
      "amount": 5,
      "currency": "CAD",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "CAD",
          "amount": 5
      },
      "to": {
          "currency": "BTC",
          "amount": 0.0004035
      }
  },
  {
      "createdAt": "2020-01-29T17:54:51.789Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-29T17:47:32.773Z",
      "amount": 2,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-29T17:15:02.789Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-24T16:24:10.979Z",
      "amount": 1,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-16T18:51:27.778Z",
      "amount": 11,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-16T18:45:14.477Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-16T18:44:34.022Z",
      "amount": 5,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T21:29:51.924Z",
      "amount": 0.04,
      "currency": "ETH",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T21:28:56.678Z",
      "amount": 0.04,
      "currency": "BTC",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:52:43.208Z",
      "amount": 0.05,
      "currency": "BTC",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:40.615Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:39.980Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:39.324Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:38.585Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:37.750Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T19:43:36.591Z",
      "amount": 150,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T18:25:17.261Z",
      "amount": 50,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T18:25:12.165Z",
      "amount": 50,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T15:19:25.746Z",
      "amount": 100,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  },
  {
      "createdAt": "2020-01-14T15:19:25.113Z",
      "amount": 100,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
  }
];
