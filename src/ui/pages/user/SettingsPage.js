import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async open() {
    await test.step(`Open the settings page`, async () => {
      await this.page.goto(`/settings`);
    });
  }

  async fillEmailField(email) {
    await test.step(`Fill the email field with ${email}`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the password field with ${password}`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickUpdateButton() {
    await test.step(`Click the update button`, async () => {
      await this.updateButton.click();
    });
  }
}