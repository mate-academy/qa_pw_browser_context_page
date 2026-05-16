import { test } from '@playwright/test';

export class UserSettingsPage {
    constructor(page) {
        this.page = page;
        this.editPasswordLink = page.getByPlaceholder('New Password');
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings', exact: false });
        this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
    }

    async inputNewPassword(inputPassword) {
        await test.step('input new password', async () => {
            await this.editPasswordLink.fill(inputPassword);
        })
    }

    async clickUpdateSettings() {
        await test.step('click update settings button', async () => {
            await this.updateSettingsButton.click();
        })
    }

    async clickLogout() {
        await test.step('click logout button', async () => {
            await this.logoutButton.click()
        })
    }
}