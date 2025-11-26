import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.emptyYourFeedTabMessage = page.getByText('No articles are here... yet.');
    this.globalFeedTab = page.getByText('Global Feed');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.profileLink = page.locator('.nav-link[href*="/profile/"]');
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('');
    });
  }

  async clickHomeLink() {
    await test.step(`Click the 'Home' link`, async () => {
    await this.homeLink.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickMyProfileLink() {
    await test.step(`Click the 'My Profile' link`, async () => {
      await this.profileLink.click();
    });
  }

  async clickSpecificArticleLink(articleTitle) {
    const article = this.page.getByRole('link', { name: `Article title: ${articleTitle}` })

    await test.step(`Click the '${articleTitle}' link`, async () => {
      await article.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertGlobalFeedTabIsVisible() {
    await test.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeedTabButton() {
    await test.step(`Click the 'Global Feed' tab button`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleOnGlobalFeedTabIsVisible(articleTitle, articleCreator) {
    const article = this.page.getByText(articleTitle);
    const creator = this.page.getByRole('link', { name: articleCreator }).first();

    await test.step(`Assert the '${articleTitle}' article is visible`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        await this.clickGlobalFeedTabButton();
        return await article.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(creator).toBeVisible();
      await expect(article).toBeVisible();
    });
  }

  async assertArticleOnYourlFeedTabIsVisible(articleTitle, articleCreator) {
    const article = this.page.getByText(articleTitle);
    const creator = this.page.getByRole('link', { name: articleCreator }).first();

    await test.step(`Assert the '${articleTitle}' article is visible`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        return await article.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(creator).toBeVisible();
      await expect(article).toBeVisible();
    });
  }

  async assertYourFeedTabIsEmpty() {
    await test.step(`Assert the 'Your Feed' tab is empty`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        return await this.emptyYourFeedTabMessage.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(this.emptyYourFeedTabMessage).toBeVisible();
    });
  }
}
