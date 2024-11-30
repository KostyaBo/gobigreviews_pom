import {expect, Locator, Page} from '@playwright/test';

export class SocialAuthPage {
    readonly page: Page;
    readonly signInWithGoogleBtn: Locator;
    readonly signInWithFacebookBtn: Locator;

    constructor (page: Page) {
    this.signInWithGoogleBtn = page.locator('a[href="/auth/google"]'); 
    this.signInWithFacebookBtn = page.locator('a[href="/auth/facebook"]');
    }

}

