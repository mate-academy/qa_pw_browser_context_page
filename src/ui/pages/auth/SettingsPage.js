import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.headingYourSettings = page.getByRole('heading', {
      name: 'Your Settings',
    });
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async clickUpdateButton() {
    await test.step(`Click update button`, async () => {
      await this.updateButton.click();
    });
  }

    async clickLogoutButton() {
    await test.step(`Click logout button`, async () => {
      await this.logoutButton.click();
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill password field by ${password}`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async assertHeadingIsVisible() {
    await test.step(`Assert the heading "Your Settings" is visible`, async () => {
      await expect(this.headingYourSettings).toBeVisible();
    });
  }
}
