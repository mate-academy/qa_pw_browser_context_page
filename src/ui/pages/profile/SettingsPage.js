import { test, expect } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByRole('textbox', { name: 'New Password' });
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async changePassword(newPassword) {
    await test.step(`Change user password`, async () => {
      await this.newPasswordField.fill(newPassword);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click Update Settings button`, async () => {
      await this.updateSettingsButton.click();
    });
  }
}
