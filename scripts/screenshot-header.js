const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:3001/es/');
  await page.waitForSelector('header');
  const servicesLink = await page.$('text=Servicios');
  if (servicesLink) {
    await servicesLink.hover();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/Abner/AppData/Local/Temp/jr-header-dropdown.png' });
  await browser.close();
})();
