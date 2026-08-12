import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.locator('input[placeholder="New Password"]');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });

  }

  async open() {  
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
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
}

