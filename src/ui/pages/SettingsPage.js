import { test, expect } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.passwordFiled = page.getByPlaceholder('New Password');
    thisupdateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async open() {
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }
}
