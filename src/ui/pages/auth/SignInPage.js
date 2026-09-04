import { expect, test } from '@playwright/test';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('list').nth(1);
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

  async signIn({ email, password }) {
    await test.step('Sign in with credentials', async () => {
      await this.fillEmailField(email);
      await this.fillPasswordField(password);
      await this.clickSignInButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertUserIsLoggedIn(username) {
    await test.step(`Assert user '${username}' is logged in`, async () => {
      await expect(
        this.page.getByRole('link', { name: username }),
      ).toBeVisible();
    });
  }
}
