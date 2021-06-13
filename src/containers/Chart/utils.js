export const calculateChange = (tx, fxRates) => {
  const { from, to } = tx;

  if (tx.type === 'conversion') {
    console.dir(tx);
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
