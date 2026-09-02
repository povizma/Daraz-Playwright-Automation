const { test, expect } = require('@playwright/test');

// Bring in our three page classes from the "pages" folder
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

// Helper: go to Daraz and search "electronics" using the page objects
async function searchElectronics(page) {
  const home = new HomePage(page);
  await home.open();                    // Task 2: navigate
  await home.searchFor('electronics');  // Task 3: search
  await expect(page).toHaveURL(/catalog/);
}

// Task 4: Brand filter
test('Apply brand filter (Anex)', async ({ page }) => {
  await searchElectronics(page);

  const results = new SearchResultsPage(page);
  await results.filterByBrand('Anex');

  await expect(page.getByText('Brand: Anex')).toBeVisible();
});

// Task 5: Price filter 500-5000
test('Apply price filter (500 to 5000)', async ({ page }) => {
  await searchElectronics(page);

  const results = new SearchResultsPage(page);
  await results.filterByPrice(500, 5000);

  await expect(page).toHaveURL(/price=500-5000/, { timeout: 20000 });
});

// Task 6: Count products
test('Count products on results page', async ({ page }) => {
  await searchElectronics(page);

  const results = new SearchResultsPage(page);
  const count = await results.getProductCount();
  console.log(`Number of products found: ${count}`);

  expect(count).toBeGreaterThan(0);
});

// Task 7: Open product details page
test('Open product details page', async ({ page, context }) => {
  await searchElectronics(page);

  const results = new SearchResultsPage(page);
  const productPage = await results.openFirstProduct(context);

  const details = new ProductDetailsPage(productPage);
  await details.waitUntilLoaded();
});

// Task 8: Verify free shipping (if available)
test('Verify free shipping on product page', async ({ page, context }) => {
  await searchElectronics(page);

  const results = new SearchResultsPage(page);
  const productPage = await results.openFirstProduct(context);

  const details = new ProductDetailsPage(productPage);
  await details.waitUntilLoaded();

  const hasFreeShipping = await details.hasFreeShipping();
  console.log(`Free shipping label found: ${hasFreeShipping}`);

  // Assert only if it's available ("if available")
  if (hasFreeShipping) {
    await expect(details.freeShipping).toBeVisible();
  }
});