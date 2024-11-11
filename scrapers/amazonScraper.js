const puppeteer = require('puppeteer');

async function fetchFromAmazon(productName) {
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.s-main-slot');

        const products = await page.evaluate(() => {
            const items = [];
            const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
            productElements.forEach(item => {
                const title = item.querySelector('.a-text-normal')?.innerText;
                const price = item.querySelector('.a-price-whole')?.innerText;
                const link = item.querySelector('.a-link-normal')?.href;
                const image = item.querySelector('img')?.src;


                if (title && price && link && image) {
                    const fullLink = link.startsWith('http') ? link : `https://www.amazon.in${link}`;
                    items.push({ title, price, link: fullLink, image, source: 'amazon' });
                }
            });
            return items;
        });

        await browser.close();
        return products;
    } catch (error) {
        console.error("Error fetching from Amazon:", error);
        await browser.close();
        return [];
    }
}

module.exports = fetchFromAmazon;
