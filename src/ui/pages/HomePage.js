import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.fieldGlobalFeed = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', {
      name: 'New Article',
    });
  }

  async open() {
    await test.step('Open Home Page', async () => {
      await this.page.goto('/');
      await expect(this.fieldGlobalFeed).toBeVisible();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickFieldGlobalFeed() {
    await test.step('Click the "Global Feed" field', async () => {
      await expect(this.fieldGlobalFeed).toBeVisible();
      await this.fieldGlobalFeed.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert article title '${title}' is NOT visible`, async () => {
      const previews = this.page.locator('.article-preview');
      const texts = await previews.allInnerTexts();
      const normalizedTitle = title.trim().toLowerCase();

      const isPresent = texts.some(text =>
        text.replace(/\s+/g, ' ').toLowerCase().includes(normalizedTitle),
      );

      expect(isPresent).toBeFalsy();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert article title '${title}' is visible in feed`, async () => {
      const previews = this.page.locator('.article-preview');
      const expected = `Article title: ${title}`.toLowerCase();
      const timeout = 20000;
      const interval = 600;
      const maxReloads = 3;
      const start = Date.now();
      let foundIndex = -1;
      let reloadCount = 0;

      while (Date.now() - start < timeout) {
        const texts = await previews.allInnerTexts();
        for (let i = 0; i < texts.length; i++) {
          const normalized = texts[i].replace(/\s+/g, ' ').toLowerCase();
          if (normalized.includes(expected)) {
            foundIndex = i;
            break;
          }
        }
        if (foundIndex !== -1) break;

        await this.page.waitForTimeout(interval);
        if (
          (Date.now() - start) % (interval * 4) < interval &&
          reloadCount < maxReloads
        ) {
          reloadCount++;
          await this.page.reload();
        }
      }

      if (foundIndex === -1) {
        const after = await previews.allInnerTexts();
        console.log('Preview texts after retry:', after);
        throw new Error(`Article with title "${title}" not found in previews`);
      }

      await expect(previews.nth(foundIndex)).toBeVisible({
        timeout: 5000,
      });
    });
  }
}
