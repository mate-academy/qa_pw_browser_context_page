import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page ) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.followButton = page.locator('.btn-outline-primary').first();
    this.FollowButton = page.locator ('.ion-plus-round').first();
    this.followAuthorProfileLink = page.locator('.article-meta .author').first();
    this.homeTab = page.getByRole('link', { name: 'Home' });
    this.articleTitleLocator = (title) => page.getByRole('link', { name: title });
    this.previewTextLocator = (text) => page.getByText('No articles are here... yet.');
    this.SettingsButton = page.getByRole('link', { name: 'Settings' });


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

  async openGlobalFeed() {
    await test.step(`Open the 'Global Feed'`, async () => {
      await this.page.getByText('Global Feed').click();
    });
  } 

  async openYourHomeTab() {
    await test.step(`Open the 'Your Feed' tab`, async () => {
      await this.homeTab.click();
    });
  }


  async openSettingsTab() {
    await test.step(`Open the 'Settings' tab`, async () => {
      await this.SettingsButton.click();
    });
  }

  async clickOnUsersArticleInGlobalFeed(articleTitle) {
    await test.step(`Click on the user's article in the Global Feed`, async () => {
      await this.page.getByRole('article').filter({ hasText: articleTitle }).click();
    });
  
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.page.getByRole('heading').filter({ hasText: title })).toBeVisible();
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.page.getByRole('link', { name: username })).toBeVisible();
    });
  }

  async clickFollowButtonOnGlobalFeed() {
    await test.step(`Click the 'Follow' button on the article in the Global Feed`, async () => {
      await this.followButton.click();
    });
} 

  async assertFollowCounterIsZero() {
    await test.step(`Assert the follow counter is zero`, async () => {
      await expect(this.followButton).toHaveText('0');
    });
  }

  async followAuthorProfile() {
    await test.step(`Follow the article's author profile`, async () => {
      await this.followAuthorProfileLink.click();
    });
  }
  
  async clickOnFollowButton() {
    await test.step(`Click on the 'Follow' button`, async () => {
      await this.FollowButton.click();
    });
  }
  async assertArticlePreviewIsEmpty() {
    await test.step(`Assert the article preview is empty`, async () => {
      await expect(this.previewTextLocator()).toBeVisible();
});
  }
}