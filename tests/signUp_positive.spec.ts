import { test, expect } from '@playwright/test';
import { SignUpClasses } from './pages/SignUpClasses';
import { SignUpTestData } from './pages/SignUpTestData';
import { faker } from '@faker-js/faker';

// Basic function

// function generateRandomName(minLength: number = 2, maxLength: number = 100): string {
//   if (minLength < 2 || maxLength > 100 || minLength > maxLength) {
//     throw new Error('Invalid length parameters. Ensure 2 <= minLength <= maxLength <= 100.');
//   }

//   const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
//   const nameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

//   let name = '';
//   for (let i = 0; i < nameLength; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     name += characters[randomIndex];
//   }

//   return name;
// }

// function with special 

function generateName(minLength: number = 2, maxLength: number = 100): string {
  if (minLength < 2 || maxLength > 100 || minLength > maxLength) {
    throw new Error('Invalid length parameters. Ensure 2 <= minLength <= maxLength <= 100.');
  }

  let name = '';

  
  while (name.length < minLength || name.length > maxLength) {
    name = faker.person.fullName(); 
    if (name.length > maxLength) {
      name = name.slice(0, maxLength); 
    }
    if (name.length < minLength) {
      name = name.padEnd(minLength, 'x'); 
    }
  }

  return name;
}


test('Positive sign-up test', async ({ page }) => {
    // Create a SignUpPositive object
    const signUpPage = new SignUpClasses(page);
  
    // Go to the registration page
    await page.goto('https://gobigreviews.com/register');
  
    // Fill in the registration form using the Page Object method

    const shortName = generateName(2, 5); 
    const longName = generateName(50, 100);
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

     await signUpPage.fillRegistrationForm (
      shortName,        // name
      randomEmail, // email
      randomPassword,     // password
      `${randomPassword}`,     // confirm password
      true,              // acceptance of terms and conditions
      false              // newsletter subscription
    );

    console.log('Check shortName :' , `${shortName}`);
    console.log('Check longName :' , `${longName}`);

    // Click the button to submit the form
    await signUpPage.submitFormBtn();
      
    // Check that the registration was successful

    await expect(page).toHaveURL('https://gobigreviews.com/'); 
    await signUpPage.checkAvatarBtn();

  });

  




