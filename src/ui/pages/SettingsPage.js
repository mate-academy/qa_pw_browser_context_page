import { expect, test } from '@playwright/test'


export class SettingsPage {

  constructor(page) {
    this.page = page;
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole(
      'button', {name: 'Update Settings'}
    );

  }

  async open() {
    await test.step('Open settings page', async () => {
      await this.page.goto('/settings');
      await this.page.waitForLoadState('load');
    });
  }

  async changePassword(newPassword) {
    await test.step(
      `Change password on new ${newPassword}`,
      async () => {
        await this.passwordField.fill(newPassword);
        await this.updateSettingsButton.click();
      })
  }

  async assertPasswordFieldIsVisible() {
    await test.step(
      'Assert password field is visible',
      async () => {
        await expect(this.passwordField).toBeVisible();
      })
  }

}