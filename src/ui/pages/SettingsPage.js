import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.imageUrlField = page.getByPlaceholder('URL of profile picture');
    this.usernameField = page.getByPlaceholder('Username');
    this.bioField = page.getByPlaceholder('Short bio about you');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async open() {
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await test.step(`Click the 'Logout' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async changePassword(newPassword) {
    await test.step(`Change password to '${newPassword}'`, async () => {
      await this.fillPasswordField(newPassword);
      await this.clickUpdateSettingsButton();
    });
  }

  async assertUpdateSettingsButtonIsVisible() {
    await test.step(`Assert the 'Update Settings' button is visible`, async () => {
      await expect(this.updateSettingsButton).toBeVisible();
    });
  }
}
