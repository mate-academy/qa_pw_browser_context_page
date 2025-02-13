import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.logOutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async open() {
    await test.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async clickLogOutButton() {
    await test.step(`Click the 'Or click here to logout.' button`, async () => {
      await this.logOutButton.click();
    });
  }
}
