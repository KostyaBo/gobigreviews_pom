import { test, expect } from '@playwright/test';
import { SignUpClasses } from './pages/SignUpClasses';
import { SignUpTestData } from './pages/SignUpTestData';
import { faker } from '@faker-js/faker';

test('Positive sign-up test', async ({ page }) => {
    // Create a SignUpPositive object
    const signUpPage = new SignUpClasses(page);
  
    // Go to the registration page
    await page.goto('https://gobigreviews.com/register');
  
    // Fill in the registration form using the Page Object method

    const randomName = faker.person.fullName()
    const randomEmail = faker.internet.email()
    const randomPassword = faker.internet.password()

     await signUpPage.fillRegistrationForm (
      randomName,        // name
      randomEmail, // email
      randomPassword,     // password
      `${randomPassword}`,     // confirm password
      true,              // acceptance of terms and conditions
      false              // newsletter subscription
    );

    console.log('Check name :' + `${randomName}`);
    console.log('Check email :' + `${randomEmail}`);

    // Click the button to submit the form
    await signUpPage.submitFormBtn();
      
    // Check that the registration was successful

    await expect(page).toHaveURL('https://gobigreviews.com/'); 
    await signUpPage.checkAvatarBtn();

  });

  




