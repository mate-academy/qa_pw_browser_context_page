import { test } from '@playwright/test';

export class SettingsProfilePage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateButton = page.getByRole('button', {
      name: 'Update',
    });
  }

  async fillNewPasswordField(newPassword) {
    await test.step(`Fill 'New Password field'`, async () => {
      await this.newPasswordField.fill(newPassword);
    });
  }

  async clickUpdateButton() {
    await test.step(`Click 'Update Article' button`, async () => {
      await this.updateButton.click();
    });
  }
}
