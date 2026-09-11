import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async assertNewPasswordFieldIsVisible() {
    await test.step(`Assert the "New Password" field is visible`, async () => {
      await expect(this.newPasswordField).toBeVisible();
    });
  }
  async updateNewPasswordField(newPassword) {
    await test.step(`Update the "New Password" field`, async () => {
      await this.newPasswordField.fill(newPassword);
    });
  }
  async clickUpdateSettingsButton() {
    await test.step('Click on "Update Settings" button', async () => {
      await this.updateSettingsButton.click();
    });
  }
  async clickLogoutButton() {
    await test.step('Click on "Logout" button', async () => {
      await this.logoutButton.click();
    });
  }
  async assertLogoutButtonIsVisible() {
    await test.step(`Assert the "Logout" button is visible`, async () => {
      await expect(this.logoutButton).toBeVisible();
    });
  }
}
