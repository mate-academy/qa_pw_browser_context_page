import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.homeLink = page.getByRole('link', { name: 'Home' }).first();
  }

  articlePreview(title) {
    return this.page.getByText(title, { exact: false }).first();
  }

  async open() {
    await test.step(`Open Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickArticlePreview(title) {
    await test.step(`Click article preview with title '${title}'`, async () => {
      await this.articlePreview(title).click();
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async clickHomeLink() {
    await test.step(`Click the 'Home' link`, async () => {
      await this.homeLink.click();
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

  async assertArticleIsVisible(title) {
    await test.step(`Assert article with title '${title}' is visible`, async () => {
      await expect(this.articlePreview(title)).toBeVisible({ timeout: 20000 });
    });
  }

  async assertArticleIsNotVisible(title) {
    await test.step(`Assert article with title '${title}' is not visible`, async () => {
      const noArticlesMessage = this.page.getByText('No articles are here... yet.');
      const hasNoArticles = await noArticlesMessage.isVisible().catch(() => false);
      
      if (!hasNoArticles) {
        const articlePreviews = this.page.locator('.article-preview');
        const count = await articlePreviews.count();
        
        for (let i = 0; i < count; i++) {
          const previewText = await articlePreviews.nth(i).textContent();
          expect(previewText).not.toContain(title);
        }
      }
    });
  }
}
