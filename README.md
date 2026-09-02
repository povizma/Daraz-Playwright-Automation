# Daraz.pk Playwright Automation

End-to-end UI automation for the [Daraz.pk](https://www.daraz.pk) e-commerce website, built with [Playwright](https://playwright.dev) and structured using the **Page Object Model (POM)**.

The suite automates a real user journey: open Daraz, search for *electronics*, apply brand and price filters, validate the search results, open a product, and check for a free-shipping label.

## Prerequisites

- [Node.js](https://nodejs.org) version 18 or newer (check with `node -v`)
- npm (comes with Node.js)

## Setup

```bash
npm install            # install project dependencies
npx playwright install # download the browsers Playwright uses
```

## Running the Tests

```bash
npx playwright test              # run all tests
npx playwright test --headed     # run in a visible browser
npx playwright test --ui         # interactive UI mode
npx playwright show-report       # open the last HTML report
```

## Project Structure

daraz-playwright-automation/
├── package.json # dependencies and scripts
├── playwright.config.js # Playwright test runner configuration
├── pages/ # Page Object Model classes
│ ├── HomePage.js # homepage: navigate and search
│ ├── SearchResultsPage.js # results: filters, product count, open product
│ └── ProductDetailsPage.js # product page: title and free shipping
└── tests/
└── daraz.spec.js # end-to-end test suite


## How Each Task Is Covered

| Task | Implementation |
|------|----------------|
| 1. Setup Playwright project | `package.json`, `playwright.config.js` |
| 2. Navigate to Daraz.pk | `HomePage.open()` |
| 3. Search for "electronics" | `HomePage.searchFor()` |
| 4. Apply brand filter | `SearchResultsPage.filterByBrand()` |
| 5. Apply price filter (500–5000) | `SearchResultsPage.filterByPrice()` |
| 6. Validate product count | `SearchResultsPage.getProductCount()` |
| 7. Open product details page | `SearchResultsPage.openFirstProduct()` |
| 8. Verify free shipping availability | `ProductDetailsPage.hasFreeShipping()` |

Tasks 2 and 3 are wrapped in a reusable `searchElectronics` helper that every test calls, keeping the test cases short and readable (the DRY principle).

## Design Notes

- **Page Object Model:** each page's locators and actions live in their own class inside the `pages/` folder, so the test files describe *what* to do while the page classes handle *how*. If the site's markup changes, updates happen in one place.
- **Stable locators:** the tests prefer resilient locators such as roles, placeholder text, and the `data-qa-locator` attribute rather than randomized CSS class names.
- **Conditional free-shipping check:** because not every product offers free shipping, the assertion for Task 8 only runs when the label is present ("if available"), which keeps the test reliable across different products.
- **Live-site handling:** Daraz is a real, dynamic website with popups and slow loads, so the tests wait for specific elements rather than for the whole page to finish loading.

## Author

Izma Qamar
