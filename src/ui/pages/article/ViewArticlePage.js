import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.SettingsButton = page.getByRole('link', { name: 'Settings' });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  
  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async openSettingsTab(){
      await test.step(`Open the 'Settings' tab`, async () => {    
        await this.SettingsButton.click();
      });
  }

  async clickEditArticleButton() {
    await test.step(`Click 'Edit Article' button`, async () => {
      await this.editButton.click();
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

  
}
