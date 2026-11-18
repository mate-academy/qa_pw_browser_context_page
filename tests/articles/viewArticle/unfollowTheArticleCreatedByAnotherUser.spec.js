import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({page, page2, user1, user2, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithoutTags);

    const viewArticlePage = new ViewArticlePage(page2);
    await viewArticlePage.open(articleWithoutTags.url);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.followArticle();
    await viewArticlePage.assertUnfavoriteArticleIsVisible();
});

test('User can unfollow the article created by another user', async({page2}) => {
    const viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.unfollowArticle();
    await viewArticlePage.assertFavoriteArticleIsVisible();
})