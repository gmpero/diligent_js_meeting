import { Page, Locator } from '@playwright/test';
import { Header } from './components/Header';

class CartPage {
    readonly page: Page;
    readonly header: Header;
    readonly title: Locator;
    readonly qtyHeader: Locator;
    readonly descriptionHeader: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartItem: Locator;

    constructor(page: Page) {
        this.header = new Header(page);
        this.page = page;
		this.title = page.getByTestId('title');
        this.qtyHeader = page.getByTestId('cart-quantity-label');
        this.descriptionHeader = page.getByTestId('cart-desc-label');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');        
        this.cartItem = page.getByTestId('inventory-item');
	}	

    getPageTitleText(element: Locator) {
		return element.getByTestId('title').textContent();
	}
}

export { CartPage };
