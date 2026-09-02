// SearchResultsPage: everything you can do on the search results page
class SearchResultsPage {
  constructor(page) {
    this.page = page;

    // Locators (the "addresses" of things on this page), stored once.
    this.productCards = page.locator('[data-qa-locator="product-item"]');
    this.minPrice = page.getByRole('spinbutton', { name: 'Min' });
    this.maxPrice = page.getByRole('spinbutton', { name: 'Max' });
  }

  // Task 4: tick a brand checkbox by its name
  async filterByBrand(brandName) {
    await this.page.getByRole('checkbox', { name: brandName }).check();
  }

  // Task 5: apply a price range using the Min/Max boxes + apply arrow
  async filterByPrice(min, max) {
    await this.minPrice.fill(String(min));
    await this.maxPrice.fill(String(max));
    // The orange arrow button applies the price filter.
    await this.page.getByRole('button').nth(2).click();
  }

  // Task 6: count how many product cards are shown
  async getProductCount() {
    await this.productCards.first().waitFor({ state: 'visible' });
    return this.productCards.count();
  }

  // Task 7: click the first product; returns the product page (new tab or same page)
  async openFirstProduct(context) {
    await this.productCards.first().waitFor({ state: 'visible' });
    const firstProductLink = this.productCards.first().locator('a').first();

    const newTabPromise = context.waitForEvent('page', { timeout: 8000 }).catch(() => null);
    await firstProductLink.click();

    const newTab = await newTabPromise;
    return newTab || this.page;
  }
}

module.exports = { SearchResultsPage };