import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByRole('textbox', { name: 'New Password' });
    this.saveChangesButton = page.getByRole('button', { name: 'Update Settings' })
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async fillNewPasswordField(newPassword) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(newPassword);
    });
 }
    async clickSaveChangesButton() {
      await test.step(`Click the 'Save Changes' button`, async () => {
        await this.saveChangesButton.click();
      });
    }

    async clickLogoutButton() {
      await test.step(`Click the 'Logout' button`, async () => {
        await this.logoutButton.click();
      });
    }
 
}