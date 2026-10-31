import { test, expect } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async open() {
    await test.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async assertEmailFieldHasValue(email) {
    await test.step(`Assert the 'Email' field has value '${email}'`,
      async () => {
      await expect(this.emailField).toHaveValue(email);
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
      await this.page.waitForURL('**/profile/**');
    });
  }
}
