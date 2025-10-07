import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordInput = page.locator('input[placeholder="New Password"]');
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async open() {
    await test.step('Open settings page', async () => {
      await this.page.click('a[href="#settings"]');
    });
  }

  async submitChangePasswordForm(oldPassword, newPassword) {
    await test.step('Submit password change form', async () => {
      await this.newPasswordInput.fill(newPassword);
      await this.updateButton.click();
    });
  }
}
