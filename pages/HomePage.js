// HomePage: everything you can do on the Daraz homepage
class HomePage {
  // The "constructor" runs when we create a HomePage.
  // It receives the browser page and remembers where things are.
  constructor(page) {
    this.page = page;
    // The search box — stored once, reused everywhere.
    this.searchBox = page.getByRole('searchbox', { name: 'Search in Daraz' });
  }

  // Task 2: go to the Daraz homepage
  async open() {
    await this.page.goto('https://www.daraz.pk/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Task 3: search for a keyword
  async searchFor(keyword) {
    await this.searchBox.fill(keyword);
    await this.searchBox.press('Enter');
  }
}

// This line lets other files import and use this class.
module.exports = { HomePage };