class InventoryPage {
    /**
	 * @param {import('playwright').Page} page 
	 */

	constructor(page) {
        this.page = page;
		this.productCards = page.getByTestId('inventory-item');
	}

}

export {InventoryPage}