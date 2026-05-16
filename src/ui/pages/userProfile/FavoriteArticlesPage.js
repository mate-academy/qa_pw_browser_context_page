import { expect, test } from '@playwright/test';

export class FavoriteArticlesPage {
    constructor(page) {
        this.page = page;
    }

    async open(userName) {
        await test.step('open favorite articles page', async () => {
            await this.page.goto(`/profile/${userName.toLowerCase()}/favorites`)
        })
    }

    async checkFollowedArticle(articleTitleText) {
        await test.step('check followed articles page', async () => {
            const articleTitle = this.page.getByRole('link', { name: `Article title: ${articleTitleText}` })

            await expect(articleTitle).toBeVisible()
        })
    }

    async checkArticleUnfollowed(articleTitleText) {
        await test.step('check chosen article is unfollowed articles page', async () => {
            const articleTitle = this.page.getByRole('link', { name: `Article title: ${articleTitleText}` })

            await expect(articleTitle).not.toBeVisible()
        })
    }

    async unfollowArticle(userName, articleTitleText) {
        await test.step('follow article', async () => {
            const currentArticle = this.articleTitleForAuthor(userName, articleTitleText);
            const followArticleButton = currentArticle.locator('button.btn.btn-sm').first();

            await followArticleButton.click();
        });
    }

    articleTitleForAuthor(userName, articleTitleText) {
        const articleTitle = this.page.getByRole('link', { name: `Article title: ${articleTitleText}` })
        const articleAuthor = this.page.getByRole('link', { name: userName });

        const articlePreview = this.page.locator('div.article-preview')
            .filter({has: articleTitle})
            .filter({has: articleAuthor})
            .first()

        return articlePreview;
    }
}