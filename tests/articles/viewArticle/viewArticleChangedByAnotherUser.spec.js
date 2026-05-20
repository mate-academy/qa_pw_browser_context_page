import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { editArticle } from '../../../src/ui/actions/articles/editArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithoutTags);
});

test('view article created and changed by another user', async ({page1, page2, articleWithoutTags}) => {
    const viewArticlePage = new ViewArticlePage(page2);

    const clearTitleData = {
        ...articleWithoutTags,
        title: `updated_${articleWithoutTags.title}`,
        url: articleWithoutTags.url
    };

    const editedArticle = await editArticle(clearTitleData, page1)

    await viewArticlePage.open(editedArticle.url);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);

    await viewArticlePage.assertArticleTitleChangedAndVisible(editedArticle.title);
})