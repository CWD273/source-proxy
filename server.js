const express = require('express');
const axios = require('axios');
const app = express();

app.get('/source', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('Missing ?url parameter');

    try {
        const response = await axios.get(targetUrl, { responseType: 'text' });

        // Force browser to display raw source code
        res.setHeader('Content-Type', 'text/plain');
        res.send(response.data);
    } catch (err) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(`Error fetching source: ${err.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
