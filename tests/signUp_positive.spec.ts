import { test, expect } from '@playwright/test';
import { SignUpClasses } from './pages/SignUpClasses';
import { SignUpTestData } from './pages/SignUpTestData';

test('Positive sign-up test', async ({ page }) => {
    // Create a SignUpPositive object
    const signUpPage = new SignUpClasses(page);
  
    // Go to the registration page
    await page.goto('https://gobigreviews.com/register');
  
    // Fill in the registration form using the Page Object method

     await signUpPage.fillRegistrationForm (
      'John Week',        // name
      'john.doe19@example.com', // email
      'Password123#',     // password
      'Password123#',     // confirm password
      true,              // acceptance of terms and conditions
      false              // newsletter subscription
    );

    // Click the button to submit the form
    await signUpPage.submitFormBtn();
      
    // Check that the registration was successful

    await expect(page).toHaveURL('https://gobigreviews.com/'); 
    await signUpPage.checkAvatarBtn();

  });

  




