import axios from 'axios';
import moment from 'moment';

export const getNetworthSeries = async () => {
  // forward requests via node proxy to solve CORS issue
  const baseUrl = process.env.REACT_APP_PROXY_SERVER;
  
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
  const txHistory = await axios(txHistoryConfig);

  // init data structure for Chart
  const labels = [];
  const datasets = [ { values: [] } ];

  // loop through txHistory and calculate net-worth
  let netWorth = 0.0;
  txHistory.data.forEach((tx, index) => {
    // TODO: There is an error in the networth calculator on CONVERSIONS that disrupts the visualisation of the data.
    // Issue can be found in utils.test.js
    if (index< 80) {
      const change = calculateChange(tx, fxRates.data);
      netWorth += change;

      // This is a tremporary UI workaround. The calculateChange() is producing errors.
      netWorth = netWorth < 0 ? 0 : netWorth;
  
      const date = moment(tx.createdAt).format('MMM D');
      labels.push(date);
      datasets[0].values.push(netWorth);
    }
  });

  return {
    labels,
    datasets
  };
};

export const calculateChange = (tx, fxRates) => {
  const { from, to } = tx;

  if (tx.type === 'conversion') {
    // console.dir(tx);
    //    BTC_CAD
    const fromAtoB= `${from.currency}_${to.currency}`;
    // console.log('from btc to cad: ', fromAtoB);
    //    CAD_BTC
    const fromBtoA = `${to.currency}_${from.currency}`;
    // console.log('ffrom cad to btc: ', fromBtoA);

    const fromAtoBFxrate = fxRates[fromAtoB];
    // console.log('from btc to cad: ', fromAtoBFxrate);
    const fromBtoAFxrate = fxRates[fromBtoA];
    // console.log('from cad to btc: ', fromBtoAFxrate);

    const fromAmount = from.amount * fromAtoBFxrate;
    // console.log('from BTC amount: ', fromAmount);
    const toAmount = to.amount * fromBtoAFxrate;
    // console.log('to CAD amount: ', toAmount);

    const debit = - fromAmount;
    // console.log('credit: ', debit);
    const credit = toAmount;
    // console.log('debit: ', credit);

    const change = credit + debit;
    // console.log(change);

    return change;
  } else {
    const fromAtoB = `${tx.currency}_CAD`;
    // console.log(fromAtoB);
    // if we cannot find the rate then we assume it is CAD_CAD
    const fxRate = fxRates[fromAtoB] || 1.0;
    // console.log(fxRate);

    let change = tx.amount * fxRate;
    // console.log(change);

    // Credits are added to net worth, debits are subtracted from net worth.
    change = tx.direction === 'credit' ? change : -change;
    // console.log(change);

    return change;
  }
};