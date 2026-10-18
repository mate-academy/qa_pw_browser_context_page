import { test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

export class EditArticlePage extends CreateArticlePage {
  constructor(page) {
    super(page);
    this.submitButtonName = 'Update Article';
    this.submitArticleButton = page.getByRole('button', {
      name: this.submitButtonName,
    });
  }

  async open(articleUrl) {
    await test.step(`Open 'Edit Article' page`, async () => {
      await this.page.goto(articleUrl.replace('/article/', '/editor/'));
    });
  }

  async submitEditArticleForm(article) {
    await test.step(`Submit the 'Edit Article' form`, async () => {
      await this.fillArticleForm(article);
      await this.clickPublishArticleButton();
    });
  }
}
