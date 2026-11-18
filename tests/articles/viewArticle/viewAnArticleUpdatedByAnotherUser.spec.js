import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page, page2, user1, user2, articleWithoutTags}) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
    page,
    page2,
    viewArticlePage,
    articleWithoutTags
}) => {
    await viewArticlePage.openEditArticlePage();

    const editArticlePage = new EditArticlePage(page);
    const newTitle = await editArticlePage.editArticleTitle();
    await editArticlePage.editArticleDescr();
    const newText = await editArticlePage.editArticleText();
    await editArticlePage.updateArticle();

    const viewArticlePage2 = new ViewArticlePage(page2);
    await viewArticlePage2.open(articleWithoutTags.url);
    await viewArticlePage2.assertArticleTitleIsVisible(newTitle);
    await viewArticlePage2.assertArticleTextIsVisible(newText);
});