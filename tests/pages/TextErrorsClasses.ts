import {expect, Locator, Page} from '@playwright/test';

export class TextErrorsClasses {
    readonly page: Page;
    readonly passwordTextError: Locator;


    constructor(page: Page) {
        this.passwordTextError = page.locator('.text-danger.errors-field');
    }


    async checkpasswordTextError() {
        // await expect(this.passwordMinLengthError).toBeVisible();
        return this.passwordTextError;
    }
}


