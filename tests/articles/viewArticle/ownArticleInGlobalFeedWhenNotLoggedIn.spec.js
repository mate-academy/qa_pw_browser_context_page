import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(
  'User can see own article in Global Feed when not logged in',
  async ({
    page1,
    page2,
    user1,
    articleWithoutTags,
  }) => {

    await signUpUser(page1, user1);
    await createArticle(page1, articleWithoutTags);

  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );

  await viewArticlePage.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );

  await viewArticlePage.assertArticleAuthorNameIsVisible(
    user1.username,
  );
});
