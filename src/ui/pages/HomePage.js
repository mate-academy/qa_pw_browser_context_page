import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.heading = page.getByRole('heading', { name: 'conduit' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  authorArticleHeaderLink(username) {
    return this.page.getByRole('link', { name: username });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async clickSignInLink() {
    await test.step(`Click the 'Sign In' link`, async () => {
      await this.signInLink.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertHeadingConduitIsVisible() {
    await test.step(`Assert the heading couduit is visible`, async () => {
      await expect(this.heading).toContainText('conduit');
    });
  }

  async assertArticleAuthorIsVisibleInGlobalFeed(username) {
    const userNameToLower = username.toLowerCase();

    await test.step(
      `Assert article has '${username}' author name in Global Feed`,
      async () => {
      await expect(this.authorArticleHeaderLink(userNameToLower))
      .toContainText(
        userNameToLower,
      );
    });
  }

  async assertArticleIsVisibleInGlobalFeed(title) {
    await test.step(
      `Assert article '${title}' is visible in Global Feed`,
      async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toBeVisible();
    });
  }

  async assertArticleIsVisibleInYourlFeed(title) {
    await test.step(
      `Assert article '${title}' is visible in Your Feed`,
      async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toBeVisible();
    });
  }

  async assertArticleIsNotVisibleInYourlFeed(title) {
    await test.step(
      `Assert article '${title}' is not visible in Your Feed`,
      async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toHaveCount(0);
    });
  }
}
