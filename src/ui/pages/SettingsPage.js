import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.passwordInput = page.getByPlaceholder('Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async open() {
    await test.step('Open Settings page', async () => {
      await this.page.goto('/settings');
    });
  }

  async fillPassword(newPassword) {
    await test.step('Fill new password in Settings', async () => {
      await this.passwordInput.fill(newPassword);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step("Click 'Update Settings' button", async () => {
      await this.updateSettingsButton.click();
    });
  }
}
