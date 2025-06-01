import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.followButton = page.locator(
      'btn.btn-sm.action-btn.btn-outline-secondary',
    );
    this.homeButton = page.getByRole('link', { name: 'Home' });
  }

  async reloadPage() {
    await test.step(`Reload the page`, async () => {
      await this.page.reload();
      await this.page.waitForTimeout(10000);
    });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
      await this.page.waitForTimeout(5000);
    });
  }

  async clickHomeButton() {
    await test.step(`Click the 'Home' button`, async () => {
      await this.homeButton.click();
      await this.page.waitForTimeout(3000);
    });
  }

  async clickFollowButton(userName) {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.page
        .getByRole('button', { name: `Follow ${userName}` })
        .nth(1)
        .click();
    });
  }

  async clickUnFollowButton(userName) {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.page
        .getByRole('button', { name: `Unfollow ${userName}` })
        .nth(1)
        .click();
    });
  }

  async expectLoaded() {
    await test.step('Expect Home Page to be loaded', async () => {
      await expect(this.yourFeedTab).toBeVisible();
      await expect(this.globalFeedTab).toBeVisible();
      await expect(this.newArticleLink).toBeVisible();
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

  async goToGlobalFeedTab() {
    await test.step('Go to the Global Feed tab', async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertCreatedArticleOfAnotherUserIsVisible(articleTitle) {
    await test.step(`Assert the created article of another user with title '${articleTitle}' is visible`, async () => {
      const article = this.page.getByText(articleTitle).first();
      await expect(article).toBeVisible();
    });
  }

  async assertCreatedArticleOfAnotherUserIsNotVisible(articleTitle) {
    await test.step(`Assert the created article of another user with title '${articleTitle}' is not visible`, async () => {
      const article = this.page.getByText(articleTitle).first();
      await expect(article).toBeHidden();
    });
  }

  async clickOnArticleTitle(articleTitle) {
    await test.step(`Click on the article title '${articleTitle}'`, async () => {
      const article = this.page.getByText(articleTitle);
      await article.click();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.page.getByText('Unfollow').first()).toBeVisible();
      await this.page.waitForTimeout(3000);
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.page.getByText('Follow').first()).toBeVisible();
    });
  }
}
