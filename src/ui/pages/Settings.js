/* eslint-disable max-len */
import { test } from '@playwright/test';

export class Settings {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByRole('textbox', { name: 'New Password' });
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async fillNewPassword(password) {
    await test.step(`Fill in a new password ${password}`, async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step('Click on Update Settings Button', async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await test.step(`Click Logout Button`, async () => {
      await this.logoutButton.click();
    });
  }
}