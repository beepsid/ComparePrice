const express = require('express');
const cors = require('cors');
const fetchFromAmazon = require('./scrapers/amazonScraper');
const fetchFromEbay = require('./scrapers/ebayScraper');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.static('public'));

app.get('/api/home', async (req, res) => {
    try {
        // Fetch products from Amazon and eBay
        const [amazonProducts, ebayProducts] = await Promise.all([
            fetchFromAmazon('trending products'), 
            fetchFromEbay('bestsellers')           
        ]);

        const products = [
            ...amazonProducts.map(product => ({
                ...product,
                price: formatPrice(product.price, 'amazon'),
                source: 'Amazon'
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
