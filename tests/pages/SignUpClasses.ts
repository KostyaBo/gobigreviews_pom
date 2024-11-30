import {expect, Locator, Page} from '@playwright/test';

export class SignUpClasses {
    readonly page: Page;
    readonly logo: Locator;
    readonly signUp: Locator;
    readonly subtitle: Locator;
    readonly conditionOptionText: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly checkboxTermsAndConditions: Locator;
    readonly checkboxSubscribeForNewsletter: Locator;
    readonly eyeBtnNotVisible: Locator;
    readonly eyeBtnVisible: Locator;
    readonly textRestriction: Locator;
    readonly avatarImg: Locator;
    readonly avatarBtn: Locator;
    readonly signUpBtn: Locator;
    readonly signInBtn: Locator;


constructor (page: Page) {
    this.page = page;
    this.logo = page.locator('.btn-link.mb-7.d-block.mx-auto.w-auto');
    this.signUp = page.locator('.text-gray-900.fw-bolder.mb-3');
    this.subtitle = page.locator('.text-gray-500.fw-semibold.fs-6');
    this.conditionOptionText = page.locator('.w-125px.text-gray-500.fw-semibold.fs-7');
    this.eyeBtnNotVisible = page.locator('ki-outline.ki-eye-slash.fs-2');
    this.eyeBtnVisible = page.locator('ki-outline.ki-eye.fs-2');
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirm-password"]');
    this.textRestriction = page.locator('.textRestriction');
    this.checkboxTermsAndConditions = page.locator('input[name="toc"]');
    this.checkboxSubscribeForNewsletter = page.locator('.form-check-input.font-weight-light');
    this.signUpBtn = page.locator('button[type="submit"]');
    this.signInBtn = page.locator('a[href="/login"]');
    this.avatarImg = page.locator('img[src="/assets/media/avatars/blank.png"]');
    this.avatarBtn = page.locator('.btn-user');

}

async fillRegistrationForm (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean = true,
    subscribeNewsletter: boolean = false
) 

{
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);

    if (acceptTerms) {
        await this.checkboxTermsAndConditions.check();
    }

    if (subscribeNewsletter) {
        await this.checkboxSubscribeForNewsletter.check();
    }
}

async submitFormBtn() {
    await this.signUpBtn.click();
}

async submitFormBtnIsDisable() {
    await expect(this.signUpBtn).toBeHidden();
}

async checkAvatarImg() {
    await expect(this.avatarImg).toBeVisible();
    await expect(this.avatarImg).toHaveAttribute('src', '/assets/media/avatars/blank.png');
    await expect(this.avatarImg).toHaveAttribute('alt', 'GoBigReview-user');
}

async checkAvatarBtn() {
    await expect(this.avatarBtn).toBeVisible();
    await expect(this.avatarBtn).toHaveAttribute('data-bs-toggle', 'dropdown');
    await expect(this.avatarBtn).toHaveAttribute('aria-expanded', 'false');
}

async checkInvalidEmail() {
    const isInvalid = await this.emailInput.evaluate((input: HTMLInputElement) => !input.checkValidity());
    expect(isInvalid).toBeTruthy();
}
   

}
