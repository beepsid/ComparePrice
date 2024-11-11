const express = require('express');
const cors = require('cors'); // Importing the CORS package to handle CORS issues
const fetchFromAmazon = require('./scrapers/amazonScraper');
const fetchFromEbay = require('./scrapers/ebayScraper');

const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS
app.use(express.static('public'));

// Home endpoint to fetch a set of default or trending products
app.get('/api/home', async (req, res) => {
    try {
        // Fetch a default set of products from Amazon and eBay
        const [amazonProducts, ebayProducts] = await Promise.all([
            fetchFromAmazon('trending products'), // Replace with a trending or popular term
            fetchFromEbay('bestsellers')           // Replace with a popular search term
        ]);

        // Combine and format the product data
        const products = [
            ...amazonProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'amazon'),
                source: 'Amazon' // Add source info if not already in data
            })),
            ...ebayProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'ebay'),
                source: 'eBay'
            }))
        ];

        res.json(products);
    } catch (error) {
        console.error("Error fetching home products:", error);
        res.status(500).json({ error: 'Failed to load home products' });
    }
});

// Search endpoint for user-specific product searches
app.get('/search', async (req, res) => {
    const productName = req.query.productName || 'default product';

    if (!productName) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    try {
        const [amazonProducts, ebayProducts] = await Promise.all([
            fetchFromAmazon(productName),
            fetchFromEbay(productName),
        ]);

        const products = [
            ...amazonProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'amazon'),
            })),
            ...ebayProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'ebay'),
            }))
        ];

        res.json(products);
    } catch (error) {
        console.error("Error processing search:", error);
        res.status(500).json({ error: 'Error fetching product data' });
    }
});

// Price formatting helper
const formatPrice = (price, source) => {
    let numericPrice = price.replace(/[₹$,\s]/g, '').trim();
    return source === 'amazon' ? `₹${numericPrice}` : `$${numericPrice}`;
};

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
