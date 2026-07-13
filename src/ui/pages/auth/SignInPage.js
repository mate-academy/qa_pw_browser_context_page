import { expect, test } from '@playwright/test';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('list').nth(1);
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async open() {
    await test.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('/user/login');
    });
  }

  async clickHomeLink() {
    await test.step(`Click 'Home' link`, async () => {
      await this.homeLink.click();
    });
  }

  async fillEmailField(email) {
    await test.step(`Fill the 'Email' field by: ${email}`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill password field by: ${password}`, async () => {
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
}
