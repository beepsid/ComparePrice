const express = require('express');
const cors = require('cors');
const fetchFromAmazon = require('./scrapers/amazonScraper');
const fetchFromEbay = require('./scrapers/ebayScraper');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

let cachedUsdToInrRate = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour cache duration

// Function to get real-time USD to INR exchange rate with retry logic
const getUsdToInrRate = async () => {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            if (cachedUsdToInrRate && Date.now() - lastFetchTime < CACHE_DURATION) {
                return cachedUsdToInrRate;
            }

            const apiKey = process.env.EXCHANGE_RATE_API_KEY;
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`, { timeout: 10000 });
            cachedUsdToInrRate = response.data.conversion_rates.INR; // Updated path
            lastFetchTime = Date.now();
            return cachedUsdToInrRate;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed: Error fetching conversion rate:`, error.message);
            if (attempts < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                return 83; // Fallback rate if all attempts fail
            }
        }
    }
};

// Price formatting and conversion helper
const formatPrice = (price, source, usdToInrRate) => {
    let numericPrice = parseFloat(price.replace(/[₹$,\s]/g, '').trim());
    if (source === 'ebay') {
        numericPrice *= usdToInrRate; // Convert USD to INR
    }
    return `₹${numericPrice.toFixed(2)}`;
};

app.get('/api/home', async (req, res) => {
    try {
        const usdToInrRate = await getUsdToInrRate();

        const [amazonProducts, ebayProducts] = await Promise.all([
            fetchFromAmazon('trending products'),
            fetchFromEbay('bestsellers')
        ]);

        const products = [
            ...amazonProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'amazon', usdToInrRate),
                source: 'Amazon'
            })),
            ...ebayProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'ebay', usdToInrRate),
                source: 'eBay'
            }))
        ];

        res.json(products);
    } catch (error) {
        console.error("Error fetching home products:", error);
        res.status(500).json({ error: 'Failed to load home products' });
    }
});

app.get('/search', async (req, res) => {
    const productName = req.query.productName || 'default product';

    if (!productName) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    try {
        const usdToInrRate = await getUsdToInrRate();

        const [amazonProducts, ebayProducts] = await Promise.all([
            fetchFromAmazon(productName),
            fetchFromEbay(productName),
        ]);

        const products = [
            ...amazonProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'amazon', usdToInrRate),
            })),
            ...ebayProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'ebay', usdToInrRate),
            }))
        ];

        res.json(products);
    } catch (error) {
        console.error("Error processing search:", error);
        res.status(500).json({ error: 'Error fetching product data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
