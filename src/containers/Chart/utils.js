import axios from 'axios';
import moment from 'moment';

export const getNetworthSeries = async () => {
  // forward requests via node proxy to solve CORS issue
  const baseUrl = "https://shakepay-is-fab-backend.herokuapp.com";
  
  // make api call for fx rates
  const ratesConfig = { 
    method: 'GET', 
    url: `${baseUrl}/api/rates`
  };
  const fxRates = await axios(ratesConfig);
  
  // make api call for tx history
  const txHistoryConfig = { 
    method: 'GET', 
    url: `${baseUrl}/api/txHistory` 
  };
  let txHistory = await axios(txHistoryConfig);

  // init data structure for Chart
  const labels = [];
  const datasets = [ { values: [] } ];

  // loop through txHistory and calculate net-worth
  let netWorth = 0.0;
  // api returns latest transactions first
  txHistory.data.reverse().forEach((tx, index) => {
    // Issue can be found in utils.test.js
    const change = calculateChange(tx, fxRates.data);
    netWorth += change;

    // accummulate all txs from the same day
    let previousTx = txHistory.data[index-1];
    if (!transactionsOccuredOnSameDay(previousTx, tx)) {
      // build X values for chart
      const date = moment(tx.createdAt).format('L');
      labels.push(date);

      // build y Values for chart
      const roundedNetWorthInCad = netWorth.toFixed(2);
      datasets[0].values.push(roundedNetWorthInCad);
    }
  });

  return {
    labels,
    datasets
  };
};

export const transactionsOccuredOnSameDay = (tx1, tx2) => {
  if (tx1 === undefined || tx2 === undefined) return false;

  const day1 = tx1.createdAt;
  const day2 = tx2.createdAt;

  return moment(day1).format('L') === moment(day2).format('L');
};

// This fn exists just for development
export const getFxRateByDate = (date, currencyPair, historicalRatesArray) => {
};

export const calculateChange = (tx, fxRates) => {
  if (tx.type === 'conversion') {
    // Naive assumption: If a conversion is made then the net worth of that
    // day remains identical. This is false; the netw worth will change
    // by a small sum depending on the fx_rate margin on currency pair.
    // return 0;

    // TODO: Must incorporate historical spot data
    // naive assumption: conversion are using constant spot rate, 
    // this function will only deliver accurates results if it uses
    // the historical spot rate.

    const { from, to } = tx;
    const fromAtoB= `${from.currency}_CAD`;
    const fromBtoA = `${to.currency}_CAD`;

    const fromAtoBFxrate = fxRates[fromAtoB] || 1.0;
    const fromBtoAFxrate = fxRates[fromBtoA] || 1.0;

    const fromAmount = from.amount * fromAtoBFxrate;
    const toAmount = to.amount * fromBtoAFxrate;

    const debit = - fromAmount;
    const credit = toAmount;

    const change = credit + debit;
    return change;
  } else {
    // handle standard debit / credit txs 
    // find the currency pairing
    const fromAtoB = `${tx.currency}_CAD`;

    // if we cannot find the rate then we assume it is CAD_CAD
    const fxRate = fxRates[fromAtoB] || 1.0;

    // calculate change
    let change = tx.amount * fxRate;

    // Credits are added to net worth, debits are subtracted from net worth.
    change = tx.direction === 'credit' ? change : -change;

    return change;
  }
};
