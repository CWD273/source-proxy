const express = require('express');
const axios = require('axios');
const app = express();

app.get('/source', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing ?url parameter" });
  }

  try {
    const response = await axios.get(targetUrl, { responseType: 'text' });
    res.status(200).json({ source: response.data });
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch URL: ${err.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
