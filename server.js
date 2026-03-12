const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const app = express();
const API_KEY = 'd6ph631r01qo88aj695gd6ph631r01qo88aj6960';

app.get('/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );
    const data = await response.json();
    res.json({ symbol: symbol, price: data.c });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

