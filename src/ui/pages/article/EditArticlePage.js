import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textBody = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async updateTitleField(title) {
    await test.step(`Update the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async updateDescriptionField(description) {
    await test.step(`Update the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async updateBodyField(text) {
    await test.step(`Update the 'Body' field`, async () => {
      await this.textBody.fill(text);
    });
  }

  async updateTagsField(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return;

    for (const tag of tagsArray) {
      await test.step(`Update with tag: "${tag}"`, async () => {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      });
    }
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
