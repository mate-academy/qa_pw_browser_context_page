import test from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async fillNewPassword(newPassword) {
    test.step(`Fill in new password '${newPassword}'`, async () => {
      this.newPasswordField.fill(newPassword);
    });
  }

  async clickOnUpdateSettingsButton() {
    test.step(`Click on the 'Update Settings' button`, async () => {
      this.updateSettingsButton.click();
    });
  }
}
