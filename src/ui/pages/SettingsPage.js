import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.editProfileSettingsButton = page.getByRole('link', { name: 'Edit Profile Settings' });
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async clickEditProfileSettingsButton() {
    await test.step(`Click the 'Edit Profile Settings' button`, async () => {
      await this.editProfileSettingsButton.click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await test.step(`Click the 'Or click here to logout' button`, async () => {
      await this.logoutButton.click();
    });
  }
}


