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
  
  // get historical rates
  const historicalEthRates = await axios({method: 'GET', url: `${baseUrl}/api/historical_rates_ETH`});
  const historicalBtcRates = await axios({method: 'GET', url: `${baseUrl}/api/historical_rates_BTC`});
  console.log(historicalEthRates.data, historicalBtcRates.data);

  // init data structure for Chart
  const labels = [];
  const datasets = [ { values: [] } ];

  // loop through txHistory and calculate net-worth
  let netWorth = 0.0;
  // api returns latest transactions first
  txHistory.data.reverse().forEach((tx, index) => {
    // TODO: Debug the calculation of aggregate net worth.
    // For visual reasons the chart is restrictedto the first 75 days of txs.
    // This is because there is a calculation error due to either:
    // A) Not taking into account historical spot rates
    // B) Incorrect arithmetic
    if (index < 75) {
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

export const getFxRateByDate = ({txDate, currencyPair, historicalRatesArray, spotRatesArray}) => {
  if (currencyPair === 'CAD_CAD') return 1.0;

  // check if the historical rate exists for given date range
  const startDate = historicalRatesArray[0].createdAt;
  const endDate = historicalRatesArray[historicalRatesArray.length-1].createdAt;
  
  const historicalRateExists = moment(txDate) >= moment(startDate) && moment(txDate) <= moment(endDate);

  // TODO: should probably return the closest historical spot rate if an exact date does not exist.
  // Current solution might lead to outliers. 
  if (!historicalRateExists) { 
    // return current spot rate if no historical rate exists 
    const constantRate = spotRatesArray[currencyPair];
    // we must take the inverse rate b/c of discrepencies in the api result
    // Historical rate api CAD_BTC = 17678
    // Spot rate api CAD_BTC = 0.00002195
    const correctRate = (1 / constantRate).toFixed(2);
    
    return correctRate;
  }

  // loop through historical rates and find the correct one
  // TODO: use a binary search or faster algo with Log(O) or better.
  const rate = historicalRatesArray.find(rate => { 
    return moment(rate.createdAt).format('L') === moment(txDate).format('L');
  }).midMarketRate;

  // check to see if we should return the inverse rate. Examples from API response:
  // standard rates: CAD_BTC === 17678
  // inverse rates:  BTC_CAD === 1/7678
  const shouldInvertRate = currencyPair.slice(0,3) !== 'CAD';

  return shouldInvertRate ? (1 / rate).toFixed(5) : rate.toFixed(5);
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
    const fromAtoB = `${from.currency}_CAD`;
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
