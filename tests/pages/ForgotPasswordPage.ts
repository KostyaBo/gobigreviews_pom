import {expect, Locator, Page} from '@playwright/test'; 

export class ForgotPasswordPage {

    readonly page: Page;
    readonly logo: Locator;
    readonly titleText: Locator;
    readonly subTitleText: Locator;
    readonly emailInput: Locator;
    readonly resetSubmitBtn: Locator;
    readonly cancelBtn: Locator;


    constructor (page: Page) {

        this.page = page;
        this.logo = page.locator('.btn-link.mb-7.d-block.mx-auto.w-auto');
        this.titleText = page.locator('.text-gray-900.fw-bolder.mb-3');
        this.subTitleText = page.locator('.text-gray-500.fw-semibold.fs-6');
        this.emailInput = page.locator('input[name="email"]');
        this.resetSubmitBtn = page.locator('#kt_password_reset_submit');
        this.cancelBtn = page.locator('a[href="https://gobigreviews.com/login"]');

    }
    
}