import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.headingYourSettings = page.getByRole('heading', { name: 'Your Settings' });
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async clickUpdateButton() {
    await test.step(`Click update button`, async () => {
      await this.updateButton.click();
    });
  }

  async fillPassswordField(text) {
    await test.step(`Fill password field by ${text}`, async () => {
      await this.passwordField.fill(text);
    });
  }

  async assertHeadingIsVisible() {
    await test.step(`Assert the heading "Your Settings" is visible`, async () => {
      await expect(this.headingYourSettings).toBeVisible();
    });
  }
}
