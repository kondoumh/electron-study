const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await browser.saveScreenshot('screenshots/1.png');
    await LoginPage.open();
    await browser.saveScreenshot('screenshots/2.png');

    await LoginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(
      'You logged into a secure area!');
    await browser.saveScreenshot('screenshots/3.png');
  });
});
