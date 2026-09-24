/* eslint-disable max-len */
import { expect, test } from '@playwright/test';
import { HomePage } from '../HomePage';

export class Favorites extends HomePage {
  constructor(page) {
    super(page);
    this.likeButton = page.getByRole('button', { name: '' });
  }

  async clickLikeButton() {
    await test.step(`Click like button`, async () => {
      await this.likeButton.click();
    });
  }

  async reload() {
    await test.step(`Reload the Favorites page`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    })
  }

  async assertArticleInFeedIsInvisible(articleTitle) {
    await test.step(`Assert the article with title '${articleTitle}' is invisible in the feed`, async () => {
      await expect(this.articleCard(articleTitle)).toBeHidden();
    });  
  }

  async assertLikeButtonDisabled() {
    await test.step(`Assert the like button is outlined (disliked)`, async () => {
      await expect(this.likeButton).toHaveClass(/btn-outline-primary/);
    });
  }

}