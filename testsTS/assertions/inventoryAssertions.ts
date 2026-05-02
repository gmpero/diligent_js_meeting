import { expect, test } from '@playwright/test';
import { InventoryPageData, Product } from '../testData/inventoryPageData';
import { InventoryPage } from '../pageObject/inventoryPage';

class InventoryAssertions {
    static async validateAllProductCards(inventoryPage: InventoryPage) {
        const allCards = await inventoryPage.productCards.all();

        for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = await inventoryPage.getProductTitle(card).textContent();

            await test.step(`Product ${i + 1}: ${title}`, async () => {
                await expect(card).toBeVisible();
                await expect(inventoryPage.getProductTitle(card)).toBeVisible();
                await expect(inventoryPage.getProductDescription(card)).toBeVisible();
                await expect(inventoryPage.getProductPrice(card)).toBeVisible();
                await expect(inventoryPage.getAddToCardButton(card)).toBeVisible();
                await expect(inventoryPage.getProductImage(card)).toBeVisible();
            });
        }
    }

    static async validateProductCardsData(inventoryPage: InventoryPage, expectProducts: Product[]) {
        const allCards = await inventoryPage.productCards.all();

        for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = await inventoryPage.getProductTitle(card).textContent();
            const expectProduct = expectProducts[i];

            await test.step(`validate Data Product ${i + 1}: ${title}`, async () => {
                await expect(inventoryPage.getProductTitle(card)).toHaveText(expectProduct.title);
                await expect(inventoryPage.getProductDescription(card)).toHaveText(expectProduct.description);
                await expect(inventoryPage.getProductPrice(card)).toHaveText(expectProduct.price);
                await expect(inventoryPage.getAddToCardButton(card)).toHaveText(InventoryPageData.BUTTON_TEXT.ADD);
                await expect(inventoryPage.getProductImage(card)).toHaveAttribute('alt', expectProduct.imageAlt);
                await expect(inventoryPage.getProductImage(card)).toHaveAttribute('src', expectProduct.imageSrc);
            });
        }
    }

    static async validateAllProductButton(inventoryPage: InventoryPage, addedItems: number[]) {
        const allCards = await inventoryPage.productCards.all();
        const addedCards = allCards.filter((_, index) => addedItems.includes(index + 1));
        const notAddedCards = allCards.filter((_, index) => !addedItems.includes(index + 1));

        for (let i = 0; i < addedCards.length; i++) {
            const card = addedCards[i];
            await expect(inventoryPage.getButtonText(card)).toHaveText(InventoryPageData.BUTTON_TEXT.REMOVE);
        }

        for (let i = 0; i < notAddedCards.length; i++) {
            const card = notAddedCards[i];
            await expect(inventoryPage.getButtonText(card)).toHaveText(InventoryPageData.BUTTON_TEXT.ADD);
        }
    }
}

export { InventoryAssertions };