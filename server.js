const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // Library for parsing HTML
const app = express();

app.get('/source', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('<p>Missing ?url parameter</p>');

    try {
        const response = await axios.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(response.data);

        // Extract cleaned-up content
        const content = $('body').html();
        const styles = $('head').html(); // Capture original styles

        res.send(`<html><head>${styles}</head><body>${content}</body></html>`);
    } catch (err) {
        res.send(`<p>Error fetching URL: ${err.message}</p>`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
