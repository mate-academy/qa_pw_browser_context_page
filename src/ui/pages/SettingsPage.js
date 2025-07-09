import { expect, test } from '@playwright/test'


export class SettingsPage {

  constructor(page) {
    this.page = page
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole(
      'button', {name: 'Update Settings'}
    );

  }

  async open() {
    await test.step('Open settings page', async () => {
      await this.page.goto('/settings')
      await this.page.waitForLoadState('load')
    });
  }

  async changePassword(newPassword) {
    await test.step(
      `Change password on new ${newPassword}`,
      async () => {
        this.passwordField.fill(newPassword);
        this.updateSettingsButton.click();
      })
  }

  async assertPasswordFieldHasNewPassword(password) {
    await test.step(
      'Assert password field has new password',
      async () => {
        await expect(this.passwordField).toHaveAttribute('value', password);
     
      })
  }

}