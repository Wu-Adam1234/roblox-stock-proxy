const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const app = express();

app.get('/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d6ph631r01qo88aj695gd6ph631r01qo88aj6960`);
    const data = await response.json();
    if (data && data.c > 0) {
      res.json({ symbol, price: data.c, pc: data.pc, open: data.o, high: data.h, low: data.l });
    } else {
      res.status(404).json({ error: 'No data' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(process.env.PORT || 3000, () => console.log('Server running'));
```

Then:
- Press **Ctrl+X**
- Press **Y**  
- Press **Enter**

Then run:
```
node server.js
