import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async open() {
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async changePassword(newPassword) {
    await test.step(`Change the profile password`, async () => {
      // wait until the form is prefilled with the current user data,
      // otherwise the async load overwrites our input
      await expect(this.emailField).not.toHaveValue('');
      await this.newPasswordField.fill(newPassword);
      await this.updateSettingsButton.click();

      // after saving, the app redirects away from the settings page
      await this.page.waitForURL((url) => !url.pathname.includes('/settings'));
    });
  }
}
