import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({page, page2, user1, user2, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithoutTags);
});

test('User can follow the article created by another user', async ({
    page2,
    articleWithoutTags
}) => {
    const viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithoutTags.url);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.followArticle();
    await viewArticlePage.assertUnfavoriteArticleIsVisible();
});