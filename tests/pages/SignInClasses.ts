import {expect, Locator, Page} from '@playwright/test';
import { SignUpClasses } from './SignUpClasses';

export class SignInPositive {
    readonly page: Page;
    readonly logo: Locator;
    readonly subtitle: Locator;
    readonly conditionOptionText: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly eyeBtnNotVisible: Locator;
    readonly eyeBtnVisible: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signInBtn: Locator;
    readonly signUpClasses: SignUpClasses;


constructor (page: Page) {
    this.page = page;
    this.logo = page.locator('.btn-link.mb-7.d-block.mx-auto.w-auto');
    this.subtitle = page.locator('.text-gray-500.fw-semibold.fs-6');
    this.conditionOptionText = page.locator('.w-125px.text-gray-500.fw-semibold.fs-7');
    this.signUpClasses = new SignUpClasses(page);
    // this.emailInput = page.locator('input[name="email"]');
    // this.passwordInput = page.locator('input[name="password"]');
    this.eyeBtnNotVisible = page.locator('ki-outline.ki-eye-slash.fs-2');
    this.eyeBtnVisible = page.locator('ki-outline.ki-eye.fs-2');
    this.rememberMeCheckbox = page.locator('input[name="toc"]');
    this.forgotPasswordLink = page.locator('a[href="https://gobigreviews.com/password-reminder"]');
    this.signInBtn = page.locator('a[href="/login"]');

}

async fillLoginForm (
    email: string,
    password: string,
    rememberMe: boolean = false
) 

{
    await this.signUpClasses.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (rememberMe) {
        await this.rememberMeCheckbox.check();
    }

}

async submitFormBtn() {
    await this.signInBtn.click();
}

async submitFormBtnIsDisable() {
    await expect(this.signInBtn).toBeHidden();
}
   

}
