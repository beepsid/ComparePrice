const puppeteer = require('puppeteer');

async function fetchFromEbay(productName) {
    const searchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productName)}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

        // Scroll down to load any lazy-loaded images
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        const products = await page.evaluate(() => {
            const items = [];
            const productElements = document.querySelectorAll('.s-item');

            productElements.forEach(item => {
                const title = item.querySelector('.s-item__title')?.innerText;
                const price = item.querySelector('.s-item__price')?.innerText;
                const link = item.querySelector('.s-item__link')?.href;

                // Attempt to capture images from different potential attributes (lazy-loaded cases)
                const image = item.querySelector('.s-item__image-img')?.getAttribute('src') ||
                    item.querySelector('.s-item__image-img')?.getAttribute('data-src') ||
                    item.querySelector('.s-item__image img')?.src || null;

                if (title && price && link && image) {
                    items.push({ title, price, link, image, source: 'ebay' });
                }
            });
            return items;
        });

        await browser.close();
        return products;
    } catch (error) {
        console.error("Error fetching from eBay:", error);
        await browser.close();
        return [];
    }
}

module.exports = fetchFromEbay;
