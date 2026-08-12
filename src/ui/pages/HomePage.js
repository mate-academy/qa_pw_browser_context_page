import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');

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

  async clickGlobalFeed() {
     await test.step(`Click the 'Global Feed' tab`, async () => {
        await this.globalFeedTab.click();
    });
  }

   articleInGlobalFeed(title) {
    return this.page.getByText(`Article title: ${title}`);
}

  async clickArticleInGlobalFeed(title) {
   await test.step(`Click article '${title}' in Global Feed`, async () => {
     await this.articleInGlobalFeed(title).click();
  });
}

  async clickYourFeed() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
}

   articleInYourFeed(title) {
    return this.page.getByText(`Article title: ${title}`);
}

  async assertArticleInYourFeedIsVisible(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert article '${title}' is visible in Your Feed`, async () => {
      await expect(this.articleInYourFeed(title)).toBeVisible();
    });
  } 

    async assertArticleInYourFeedIsNotVisible(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert article '${title}' is not visible in Your Feed`, async () => {
      await expect(this.articleInYourFeed(title)).toBeHidden();
    });
  } 

  async assertArticleIsVisibleInGlobalFeed(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert article '${title}' is visible in Global Feed`, async () => {
      await expect(this.articleInGlobalFeed(title)).toBeVisible({ timeout: 10000 });
    });
  }
}