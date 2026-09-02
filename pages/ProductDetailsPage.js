// ProductDetailsPage: everything you can do on a single product's page
class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    // The product title — proof the page loaded.
    this.title = page.locator('.pdp-mod-product-badge-title, h1').first();

    // The "Free Shipping" label (may or may not exist on a given product).
    this.freeShipping = page.getByText(/free shipping/i).first();
  }

  // Task 7: wait until the product title is visible (page has loaded)
  async waitUntilLoaded() {
    await this.title.waitFor({ state: 'visible', timeout: 25000 });
  }

  // Task 8: is a free-shipping label showing? returns true or false
  async hasFreeShipping() {
    return this.freeShipping.isVisible().catch(() => false);
  }
}

module.exports = { ProductDetailsPage };