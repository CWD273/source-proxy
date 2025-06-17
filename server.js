const express = require('express');
const axios = require('axios');
const app = express();

app.get('/source', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url param');
  
  try {
    const response = await axios.get(targetUrl, { responseType: 'text' });
    res.type('text/plain').send(response.data);
  } catch (err) {
    res.status(500).send(`Error fetching URL: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
