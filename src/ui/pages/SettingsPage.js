import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.settingsTab = page.getByRole('link', { name: 'Settings' });
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async clickSettingsTab() {
    await test.step(`Click the 'Settings' tab`, async () => {
      await this.settingsTab.click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async assertProfilePage(username) {
    await test.step(`Assert user returned to the profile page`, async () => {
      await expect(
        this.page.getByRole('heading', { name: `${username}` }),
      ).toBeVisible();
    });
  }
}
