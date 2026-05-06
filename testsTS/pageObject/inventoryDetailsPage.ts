import { Page, Locator } from '@playwright/test';
import { Header } from './components/Header';
import { secondaryHeader } from './components/secondaryHeader';

// type Position = 1 | 2 | 3 | 4 | 5 | 6;

class InventoryDetailsPage {
    readonly page: Page;
    readonly header: Header;
    readonly secondaryHeader: secondaryHeader;
    readonly title: Locator;

    readonly itemImage: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    //    readonly cartBadge: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.secondaryHeader = new secondaryHeader(page);
        this.title = page.getByTestId('title');

        this.itemImage = page.locator('.inventory_details_img');
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.addToCartButton = page.locator('button.btn_inventory');
        //      this.cartBadge = page.getByTestId('shopping-cart-badge');
    }
}

export { InventoryDetailsPage };