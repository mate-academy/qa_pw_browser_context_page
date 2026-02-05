import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedLink = page.getByText('Global Feed');
    
    
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

  async clickGlobalFeedLink() {
    await test.step(`Click the 'Global Feed' link`, async () => {
      await this.globalFeedLink.click();
    });
  }

  articleAtGlobalFeed(title) {
  return this.page
    .locator('.article-preview')
    .filter({ hasText: title});
  }

  articleTitleAtGlobalFeed(title) {
  return this.articleAtGlobalFeed(title).locator('h1');
  }

  articleDescriptionAtGlobalFeed(title) {
    return this.articleAtGlobalFeed(title).locator('p');
  }

  articleAuthorAtGlobalFeed(title) {
    return this.articleAtGlobalFeed(title).locator('a.author');
  }

  async assertTitleAtGlobalFeedIsVisible(title) {
    await test.step(`Assert the 'Article Title' is visible at Global Feed`, 
      async () => {
      await expect(this.articleTitleAtGlobalFeed(title)).toBeVisible();
    });
  }

  async assertDescriptionAtGlobalFeedIsVisible(title, description) {
  await test.step(`Assert the 'Article Description' is visible at Global Feed`, 
    async () => {
    await expect(this.articleDescriptionAtGlobalFeed(title))
    .toContainText(description);
  });
}

  async assertArticleAuthorAtGlobalFeedIsVisible(title, username) {
    await test.step(`Assert the 'Author' is visible at Global Feed`, 
      async () => {
      await expect(this.articleAuthorAtGlobalFeed(title))
      .toContainText(username);
    });
  }


  async assertArticleIsNotPresentAtFeed(title) {
  await test.step(`Assert the article is not present in feed`, async () => {
    await expect(this.articleAtGlobalFeed(title)).toHaveCount(0);
  });
}


  





  


}

