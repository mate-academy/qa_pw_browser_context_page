import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.settingsPage = page.getByText(`Your Settings`);
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.newPassword = page.getByPlaceholder(`New Password`);
    this.updateSettingsButton = page.getByRole(`button`, {
      name: 'Update Settings',
    });
  }

  async clickSettingsLink() {
    await test.step('Click the Settings link', async () => {
      await this.settingsLink.click();
    });
  }

  async assertYourSettingsIsDisplayed() {
    await test.step(`Assert 'Your Settings' page is opened`, async () => {
      await expect(this.settingsPage).toBeVisible();
    });
  }

  async fillNewPasswordField(text) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPassword.fill(text);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async updateUserPassword(password) {
    await test.step(`Update the user password`, async () => {
      await this.clickSettingsLink();
      await this.assertYourSettingsIsDisplayed();
      await this.fillNewPasswordField(password);
      await this.clickUpdateSettingsButton();
    });
  }
}
