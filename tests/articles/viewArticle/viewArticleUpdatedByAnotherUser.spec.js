import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(
  'User can view an article updated by another user',
  async ({
    page1,
    page2,
    user1,
    user2,
    articleWithoutTags,
  }) => {
    const viewArticlePage1 = new ViewArticlePage(page1);
    const viewArticlePage2 = new ViewArticlePage(page2);
    const editArticlePage = new EditArticlePage(page1);

    await signUpUser(page1, user1);
    await createArticle(page1, articleWithoutTags);

    const updatedTitle = 'Updated article title';
    const updatedText = 'Updated article text';

    await viewArticlePage1.clickEditArticleButton();

    await editArticlePage.fillTitleFild(updatedTitle);
    await editArticlePage.fillTextFild(updatedText);
    await editArticlePage.clickUpdateArticleButton();

    await signUpUser(page2, user2);

    await viewArticlePage2.open(articleWithoutTags.url);

    await viewArticlePage2.assertArticleTitleIsVisible(updatedTitle);
    await viewArticlePage2.assertArticleTextIsVisible(updatedText);
  },
);