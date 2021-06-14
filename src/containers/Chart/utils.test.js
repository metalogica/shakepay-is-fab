import { ratesStub } from './stubs.js';
import { calculateChange, getNetworthSeries, transactionsOccuredOnSameDay, getFxRateByDate } from './utils';

xdescribe('getNetworthSeries(', () => {
  it('should return the correct shape', () => {
    const stub = {
      labels: ['d1', 'd2', 'd3'],
      datasets: [{ values: [43, 55, 66, 80, 77]}]
    };

    expect(
      Object.keys(stub)
    ).toEqual(
      Object.keys(getNetworthSeries)
    );
  });

  it('should allow a customer to filter date range', () => {
  });
});

describe('transactionsOccuredOnSameDay(tx1, tx2)', () => {
  it('should return true if tx1 and tx2 occured on the same day', () => {
    const tx1 = {
      "createdAt": "2020-01-13T21:44:11.811Z",
      "amount": 5.42,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };
    const tx2 = {
      "createdAt": "2020-01-13T21:39:49.419Z",
      "amount": 5.42,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };

    expect(transactionsOccuredOnSameDay(tx1, tx2)).toEqual(true);
  });

  it('should return false if tx1 and tx2 did not occur on the same day', () => {
    const tx1 = {
      "createdAt": "2020-01-13T21:39:49.419Z",
      "amount": 5.42,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };
    const tx2 = {
      "createdAt": "2020-01-14T15:18:21.413Z",
      "amount": 50,
      "currency": "CAD",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };

    expect(transactionsOccuredOnSameDay(tx1, tx2)).toEqual(false);
  });
});

xdescribe('getFxRateByDate()', () => {
  it('should return the historical fxRate', () => {

  });
});

describe('calculateChange(tx: Object)', () => {
  it('should calculate CAD credit correctly', () => {
    const tx = {
      "createdAt": "2020-04-20T15:49:57.741Z",
      "amount": 100,
      "currency": "CAD",
      "type": "external account",
      "direction": "credit",
      "from": {}
    };

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(100);
  });

  it('should calculate CAD debit correctly', () => {
    const tx = {
      "createdAt": "2020-04-20T15:49:57.741Z",
      "amount": 100,
      "currency": "CAD",
      "type": "external account",
      "direction": "debit",
      "from": {}
    };

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(-100);
  });

  it('should calculate BTC credit correctly', () => {
    const tx = {
      "createdAt": "2020-03-16T18:30:59.575Z",
      "amount": 0.01,
      "currency": "BTC",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };
    
    const fxRate = 45555.82;
    const actualChange = (fxRate * 0.01);

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate BTC debit correctly', () => {
    const tx = {
      "createdAt": "2020-03-16T18:30:59.575Z",
      "amount": 0.01,
      "currency": "BTC",
      "type": "peer",
      "direction": "debit",
      "from": {}
    };
    
    const fxRate = 45555.82;
    const actualChange = - (fxRate * 0.01);

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate ETH credit correctly', () => {
    const tx = {
      "createdAt": "2020-03-16T18:30:59.575Z",
      "amount": 0.01,
      "currency": "ETH",
      "type": "peer",
      "direction": "credit",
      "from": {}
    };
    
    const fxRate = 2960.37;
    const actualChange = (fxRate * 0.01);

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate ETH debit correctly', () => {
    const tx = {
      "createdAt": "2020-03-16T18:30:59.575Z",
      "amount": 0.01,
      "currency": "ETH",
      "type": "peer",
      "direction": "debit",
      "from": {}
    };
    
    const fxRate = 2960.37;
    const actualChange = - (fxRate * 0.01);

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate BTC-CAD conversion correctly', () => {
    const tx = {
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
    };
    
    const fromFxRate = 45555.82;
    const toFxRate = 1.0;
    const debit = - (fromFxRate * 0.00146125);
    const credit = toFxRate * 18;
    //                   -48
    const actualChange = debit + credit;

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate CAD-BTC conversion correctly', () => {
    const tx = {
      "createdAt": "2018-03-30T15:39:31.752Z",
      "amount": 20,
      "currency": "CAD",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "CAD",
          "amount": 20
      },
      "to": {
          "currency": "BTC",
          "amount": 0.03893256
      }
    };
    
    const fromFxRate = 1.0;
    const toFxRate = 45555.82;
    const debit = - (fromFxRate * 20);
    const credit = toFxRate * 0.03893256;
    //                  157
    const actualChange = debit + credit;

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate CAD-ETH conversion correctly', () => {
    const tx = {
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
          "currency": "ETH",
          "amount": 0.00040243
      }
    };
    
    const fromFxRate = 1;
    const toFxRate = 2960.37;
    const debit = - (fromFxRate * 5);
    const credit = toFxRate * 0.00040243;
    //                   -3.8
    const actualChange = debit + credit;

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });

  it('should calculate ETH-CAD conversion correctly', () => {
    const tx = {
      "createdAt": "2018-06-08T14:58:02.283Z",
      "amount": 0.03,
      "currency": "ETH",
      "type": "conversion",
      "direction": null,
      "from": {
          "currency": "ETH",
          "amount": 0.03
      },
      "to": {
          "currency": "CAD",
          "amount": 21.95
      }
    };
    
    const fromFxRate = 2960.37;
    const toFxRate = 1.0;
    const debit = - (fromFxRate * 0.03);
    const credit = toFxRate * 21.95;
    //                   -66.87
    const actualChange = debit + credit;

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });
});
