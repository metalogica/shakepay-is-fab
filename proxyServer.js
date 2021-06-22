/* eslint-disable no-debugger */
// Used to eliminate CORS issues for client-facing app.
const express = require('express');
const request = require('request');
const path = require('path');
const fs = require('fs');

const app = express();

// Used for static bundling in serving content in Docker Container
app.use('/static', express.static(path.resolve(__dirname, './build/static')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  const reactAppPath = path.resolve(__dirname, './build/index.html');
  const reactApp = fs.readFileSync(reactAppPath, 'utf-8');
  res.send(reactApp);
});

app.get('/api/rates', (req, res) => {
  request(
    { url: 'https://api.shakepay.co/rates' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get('/api/txHistory', (req, res) => {
  request(
    { url: 'https://shakepay.github.io/programming-exercise/web/transaction_history.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get('/api/historical_rates_BTC', (req, res) => {
  request(
    { url: 'https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get('/api/historical_rates_ETH', (req, res) => {
  request(
    { url: 'https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
