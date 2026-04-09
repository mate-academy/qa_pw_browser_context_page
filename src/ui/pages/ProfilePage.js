import { test } from '@playwright/test';

export class ProfilePage {
  constructor (page) {
    this.page = page;
    this.profilePasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.
    getByRole('Button', { name: 'Update Settings'});
  }

  async profilePasswordFieldFill (password) {
    await test.step(`Fill password field`, async () => {
      await this.profilePasswordField.fill(password);
    });
  } 

  async updateSettingsButtonClick () {
    await test.step(`Click uppdate settings button`, async () => {
      await this.updateSettingsButton.click();
    });
  }
}