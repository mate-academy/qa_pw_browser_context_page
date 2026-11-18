import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page, page2, user1, user2, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithoutTags);
});

test('User can view an article created by another user in the Global Feed', async({page2, user2, articleWithoutTags}) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);

    await homePage.openGlobalFeed();
    await homePage.openCreatedArticle(articleWithoutTags.title);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
})