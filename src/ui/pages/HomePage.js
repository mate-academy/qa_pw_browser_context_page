import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {

    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.articles = page.getByRole('link', {name: 'Article title: '});
    this.settings = page.locator('a[href="/settings"]');
    this.userNameButton = page.getByAltText('your profile image');
    
  }

  async open() {
    await test.step('Open HomePage', async () => {
      await this.page.goto('/');
    });
  }
  async clickSettingsLink() {
  await test.step(`Click the 'Settings' link`, async () => {
    await this.settings.click();
  });
}

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickArticleFromGlobalFeedList(articleName) {
    await test.step(
      `Click article ${articleName} on global feed tav`, 
      async () =>{
        await this.articles.filter({hasText: articleName}).click()
    });
  }

  async clickGlobalFeedTab() {
    await test.step('Click global feed tab', async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleVisibleInYourFeed(articleName) {
    await test.step(
      `Assert the article ${articleName}, visible in your feed tab`, 
      async () =>{
        const searchedArticle = (
          await this.articles
          .filter({hasText: articleName})
        );
        await expect(searchedArticle).toBeVisible({timeout: 10000});
    });
  }

  async assertArticleVisibleInGlobalFeed(articleName) {
    await test.step(
      `Assert the article ${articleName}, visible in global feed tab`, 
      async () => {
        const maxRetries = 5;
        
        for (let iteration = 0; iteration < maxRetries; iteration += 1) {
          try {
            const searchedArticle = ( 
              await this.articles.filter({hasText: articleName})
            );
            await expect(searchedArticle).toBeVisible();
            return;
          } catch {
              if ( iteration === maxRetries) {
                throw new Error(
                  `Article "${articleName}" not 
                  visible after ${maxRetries} retries.`
                );
              }
              await this.page.reload();
            }
        }
      });
  }

  async assertArticleToBeHiddenInYourFeed(articleName) {
    await test.step(
      `Assert the article ${articleName}, visible in global your tab`, 
      async () =>{
        const searchedArticle = (
          await this.articles
          .filter({hasText: articleName})
        );
        await expect(searchedArticle).toBeHidden();
    });
  }

  async assertUserNameIsVisible() {
    await test.step(`Assert the user name is visible`, async () => {
      await expect(this.userNameButton).toBeVisible();
    });
  }

}
