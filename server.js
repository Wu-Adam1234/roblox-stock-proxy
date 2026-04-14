const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const app = express();

app.get('/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const key = process.env.FINNHUB_KEY;
    const url = 'https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + key;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.c > 0) {
      res.json({ symbol: symbol, price: data.c, pc: data.pc, open: data.o, high: data.h, low: data.l });
    } else {
      res.status(404).json({ error: 'No price data', symbol: symbol });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
