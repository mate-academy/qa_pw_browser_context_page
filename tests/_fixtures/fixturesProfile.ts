import { test as base } from '@playwright/test';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

export const test = base.extend<{
  profilePage;
}>({
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await use(profilePage);
  },
});
