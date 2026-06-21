import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByRole('textbox', { name: 'New Password' });
    this.settingsHeader = page.getByRole('heading', { name: 'Your Settings' });
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.settingsButton = page.getByRole('link', { name: 'Settings' });
  }

  async open() {
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async assertSettingsHeaderIsVisible() {
    await test.step(`Assert the 'Settings' header is visible`, async () => {
      await expect(this.settingsHeader).toBeVisible();
    });
  }

  async fillNewPasswordField(newPassword) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(newPassword);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickSettingsButton() {
    await test.step(`Click the 'Settings' button`, async () => {
      await this.settingsButton.click();
    });
  }
}
