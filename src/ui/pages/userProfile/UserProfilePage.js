import { test } from '@playwright/test';

export class UserProfilePage {
    constructor(page) {
        this.page = page;
        this.followUserButton = page.getByRole('button', { name: /Follow/i });
        this.editProfileSettingsLink = page.getByRole('link', { name: /Edit Profile Settings/i });
    }

    async followOrUnfollowUserProfile() {
        await test.step('follow/unfollow user profile page', async () => {
            await this.followUserButton.click();
        })
    }

    async clickEditProfileSettings() {
        await test.step('click update profile settings', async () => {
            await this.editProfileSettingsLink.click();
        })
    }
}