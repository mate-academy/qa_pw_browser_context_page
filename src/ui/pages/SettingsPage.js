import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = this.page.getByPlaceholder('New Password');
    this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
  }

  async clickUpdateSettingsButton() {
    await test.step('Click the Update Settings button', async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the password field with: ${password}`, async () => {
      await this.newPasswordField.fill(password);
    });
  }
}
