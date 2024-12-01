import { test, expect } from '@playwright/test';
import { SignUpClasses } from './pages/SignUpClasses';
import { SignUpTestData } from './pages/SignUpTestData';
import { TextErrorsClasses } from './pages/TextErrorsClasses';

test.describe('Sign-Up Page Negative Tests', () => {
  let signUpPage: SignUpClasses;
  let textErrorsClasses: TextErrorsClasses;


  test.beforeEach(async ({ page }) => {
    textErrorsClasses = new TextErrorsClasses(page);
    signUpPage = new SignUpClasses(page); 
    await page.goto('https://gobigreviews.com/register'); 
  });

  test.only('Should show error for invalid email format', async () => {

    await signUpPage.fillRegistrationForm(
      'John Doe',
      'invalid-email',
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
    const {passwordDoesNotMatch} = SignUpTestData.errorMsng;
    await signUpPage.fillRegistrationForm(
      'John Doe',
      'john.doe@example.com',
      'password123',
      'password456', 
      true,
      false
    );

    await signUpPage.submitFormBtn();

    // Check that the error is displayed
    const passwordError = await textErrorsClasses.checkpasswordTextError(); 
    await expect(passwordError).toHaveText(passwordDoesNotMatch);
    await expect(passwordError).toBeVisible();
  });
});
