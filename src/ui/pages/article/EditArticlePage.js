import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.editLink = page
      .locator('a.btn.btn-outline-secondary.btn-sm[href*="/editor/"]')
      .filter({ hasText: 'Edit Article' })
      .first();
    this.titleInput = page.getByPlaceholder('Article Title');
    this.aboutInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    // eslint-disable-next-line max-len
    this.saveButton = page.getByRole('button', { name: /Publish Article|Update Article/i });
    this.articleTitleHeader = page.getByRole('heading');
  }

  async openFromView(currentUrl) {
    await test.step(`Open 'Edit Article' form`, async () => {
      if (await this.editLink.isVisible().catch(() => false)) {
        await this.editLink.click();
      } else {
        const url = currentUrl ?? this.page.url();
        await this.page.goto(url.replace('/article/', '/editor/'));
      }
      await expect(this.titleInput).toBeVisible();
    });
  }

  async fill({ title, about, text }) {
    await test.step(`Fill edit form`, async () => {
      if (title !== undefined) await this.titleInput.fill(title);
      if (about !== undefined) await this.aboutInput.fill(about);
      if (text !== undefined) await this.bodyInput.fill(text);
    });
  }

  async save() {
    await test.step(`Save article changes`, async () => {
      await this.saveButton.click();
    });
  }

  async updateArticle(updates) {
    await this.openFromView();
    await this.fill(updates);
    await this.save();
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
