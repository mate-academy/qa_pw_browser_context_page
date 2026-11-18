import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach( async ({ page, user1, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await createArticle(page, articleWithoutTags);
});

test('User can see own article in "Global feed" when not logged in', async({ page2, articleWithoutTags}) => {
    test.setTimeout(90000);
    const homePage2 = new HomePage(page2);
    await page2.goto('/');
    await homePage2.openGlobalFeed();

    const createdArticle = homePage2.getArticleByTitle(articleWithoutTags.title);

    await expect(async () => {
        await page2.reload();
        await homePage2.openGlobalFeed();

        await expect(createdArticle).toBeVisible({ timeout: 10000 });
    }).toPass({
        intervals: [15000],
        timeout: 90000,
    });
    await homePage2.openCreatedArticle(articleWithoutTags.title);
});

