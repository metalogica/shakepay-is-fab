import { ratesStub } from './stubs.js';
import { calculateChange } from './utils';

xdescribe('getNetworthSeries(', () => {
  xit('should return the correct shape', () => {
    const stub = {
      labels: ['d1', 'd2', 'd3'],
      datasets: [{ values: [43, 55, 66, 80, 77]}]
    };

    const networthSeries = getNetworthSeries();

    expect(
      Object.keys(stub)
    ).toEqual(
      Object.keys(networthSeries)
    );
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
    
    const fxRate = ratesStub['BTC_CAD'];
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
    
    const fxRate = ratesStub['BTC_CAD'];
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
    
    const fxRate = ratesStub['ETH_CAD'];
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
    
    const fxRate = ratesStub['ETH_CAD'];
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
    
    const fromFxRate = ratesStub['BTC_CAD'];
    const toFxRate = ratesStub['CAD_BTC'];
    const debit = - (fromFxRate * 0.00146125);
    const credit = toFxRate * 18;
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
    const toFxRate = ratesStub['ETH_CAD'];
    const debit = - (fromFxRate * 5);
    const credit = toFxRate * 0.00040243;
    const actualChange = debit + credit;

    const change = calculateChange(tx, ratesStub);
    expect(change).toEqual(actualChange);
  });
});
