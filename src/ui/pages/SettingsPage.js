import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole(
      'button', {name: 'Update Settings'});
    this.logoutButton = page.getByRole(
      'button', {name: 'Or click here to logout.'});
  }

  async fillPasswordField(password) {
    await test.step(`Enter new password`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickOnUpdateSettingsButon() {
    await test.step(`Click 'Update Settings' button`, 
      async () => {
        await this.updateSettingsButton.click();
      });
  }

  async clickOnLogoutButon() {
    await test.step(`Click 'logout' button`, 
      async () => {
        await this.logoutButton.click();
      });
  }
}
