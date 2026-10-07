const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();
  const base = 'https://booking-service-lemon.vercel.app';

  await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screens/landing.png', fullPage: true });

  await page.goto(`${base}/book`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screens/book.png', fullPage: true });

  await page.goto(`${base}/admin/login`, { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', 'kuizoki4@gmail.com');
  await page.type('input[type="password"]', 'hello123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: 'screens/admin.png', fullPage: true });

  await page.goto(`${base}/book`, { waitUntil: 'networkidle0' });
  await page.type('input[placeholder="Ваше имя"]', 'Иван Петров');
  await page.type('input[placeholder="+79991234567"]', '+79991234567');
  await page.select('select', 'Стрижка');
  await page.evaluate(() => {
    const d = document.querySelector('input[type="date"]');
    const t = document.querySelector('input[type="time"]');
    const setVal = (el, v) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    setVal(d, '2027-12-01');
    setVal(t, '14:00');
  });
  await page.screenshot({ path: 'screens/book-filled.png' });

  // мобильный
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screens/landing-mobile.png', fullPage: true });

  await browser.close();
  console.log('done');
})();
