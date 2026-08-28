import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.globalFeedTab = page.getByText('Global Feed', { exact: true });
    this.editArticleLink = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }


  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  articlePreviewLink(title) {
    return this.page.getByRole('link', { name: title });
  }

  articleTag(tag) {
    return this.page.locator('.tag-list .tag-default', { hasText: tag });
  }

  followButton(username) {
    return this.page.getByRole('button').filter({ hasText: username }).nth(1);
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async followUser(username) {
    await test.step(`Follow user ${username}`, async () => {
      await this.followButton(username).click();
    });
  }

  async unfollowUser(username) {
    await test.step(`Unfollow user ${username}`, async () => {
      await this.followButton(username).click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async openArticleFromFeed(title) {
    await test.step(`Open the article "${title}" from the feed`, async () => {
      await this.articlePreviewLink(title).click();
    });
  }

  async assertArticleIsNotVisibleInFeed(title) {
    await test.step(`Assert the article '${title}' is not visible in the feed`, async () => {
      await expect(this.articlePreviewLink(title)).toBeHidden();
    });
  }

  async assertArticleHasTag(tag) {
    await test.step(`Assert the article has tag "${tag}"`, async () => {
      await expect(this.articleTag(tag)).toBeVisible();
    });
  }
}
