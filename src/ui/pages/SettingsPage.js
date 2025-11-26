import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
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

  async assertSettingsUpdated() {
    await test.step(`Assert the settings are updated`, async () => {
      await expect(this.page.getByText('Update successful!')).toBeVisible();
    });
  }
}
