import { expect, test } from '@playwright/test';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('list').nth(1);
    this.settingPage = page.getByRole('link', { name: 'Settings' })
    this.newPasswordField = page.getByPlaceholder('New Password')
    this.updSettingButton = page.getByRole('button', { name: 'Update Settings' })
    this.logOutButton = page.getByRole('button', { name: 'Or click here to logout.' })
  }

  async open() {
    await test.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('/user/login');
    });
  }

  async fillEmailField(email) {
    await test.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickSignInButton() {
    await test.step(`Click the 'Sign in' button`, async () => {
      await this.signInButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clickSettingBuuton() {
    await test.step(`Clic Setting button`, async () => {
      await this.settingPage.click()
    })
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill a new password`, async () => {
       await this.newPasswordField.fill(password)
    })
  }

  async clickUpdateSettingButton() {
    await test.step(`Click update setting button`, async () => {
      await this.updSettingButton.click()
    })
  }

  async clickToLogOutButton() {
    await test.step(`Click to LogOut`, async () => {
      await this.logOutButton.click()
    })
  }
  
}
