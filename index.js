const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const url = 'https://www.aiku.life/'; // Replace with the website URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the website
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Get the HTML content
        const html = await page.content();

        // Fetch all linked CSS files
        const cssLinks = await page.evaluate(() =>
            Array.from(document.querySelectorAll('link[rel="stylesheet"]'), (link) => link.href)
        );

        console.log('html got...');

        const cssFiles = {};
        for (const link of cssLinks) {
            try {
                // Fetch each CSS file
                const cssResponse = await page.goto(link, { waitUntil: 'networkidle2' });
                const cssText = await cssResponse.text();
                cssFiles[link] = cssText;
            } catch (err) {
                console.error(`Failed to fetch CSS file: ${link}`);
            }
        }

        // Save the HTML and CSS files locally if needed
        const fs = require('fs');
        fs.writeFileSync(path.join(__dirname, 'index.html'), html);
        for (const [link, css] of Object.entries(cssFiles)) {
            const filename = path.basename(new URL(link).pathname);
            fs.writeFileSync(path.join(__dirname, filename), css);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await browser.close();
    }
})();
