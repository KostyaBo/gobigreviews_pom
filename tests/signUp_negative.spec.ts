import { test, expect } from '@playwright/test';
import { SignUpClasses } from './pages/SignUpClasses';
import { SignUpTestData } from './pages/SignUpTestData';
import { TextErrorsClasses } from './pages/TextErrorsClasses';
import { faker } from '@faker-js/faker';

test.describe('Sign-Up Page Negative Tests', () => {
  let signUpPage: SignUpClasses;
  let textErrorsClasses: TextErrorsClasses;


  test.beforeEach(async ({ page }) => {
    textErrorsClasses = new TextErrorsClasses(page);
    signUpPage = new SignUpClasses(page); 
    await page.goto('https://gobigreviews.com/register'); 
  });

  test('Should show error for invalid email format', async () => {

    const invalidEmail = faker.lorem.word()

    await signUpPage.fillRegistrationForm(
      'John Doooe',
      invalidEmail,
      'Password123%',
      'Password123%',
      true,
      false
    );

    await signUpPage.submitFormBtn();
    await signUpPage.checkInvalidEmail();
  });

  test('Should show error for mismatched passwords', async () => {
    // Filling out the form with mismatched passwords
    const password = faker.internet.password()
    const {passwordDoesNotMatch} = SignUpTestData.errorMsng;
    await signUpPage.fillRegistrationForm(
      'John Doe',
      'john.doe@example.com',
      password,
      `${password}Mismatch`,
      true,
      false
    );

    console.log('Password: ', password);
    console.log('Mismatched Password: ', `${password}Mismatch`);

    await signUpPage.submitFormBtn();

    // Check that the error is displayed
    const passwordError = await textErrorsClasses.checkpasswordTextError(); 
    await expect(passwordError).toHaveText(passwordDoesNotMatch);
    await expect(passwordError).toBeVisible();
  });
});
