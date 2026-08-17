import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleFild = page.getByPlaceholder('Article Title');
    this.descriptionFild = page.getByPlaceholder("What's this article about?");
    this.textFild = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async fillTitleFild(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleFild.fill(title);
    });
  }

  async fillDescriptionFild(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionFild.fill(description);
    });
  }

  async fillTextFild(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textFild.fill(text);
    });
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
