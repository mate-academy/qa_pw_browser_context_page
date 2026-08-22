import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
  page2,
  articleWithoutTags,
  viewArticlePage,
  editArticlePage,
}) => {
  const updatedTitle = `Updated ${articleWithoutTags.title}`;
  const updatedText = `Updated ${articleWithoutTags.text}`;

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTitleField(updatedTitle);
  await editArticlePage.fillTextField(updatedText);
  await editArticlePage.clickUpdateArticleButton();

  const homePage2 = new HomePage(page2);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await homePage2.assertYourFeedTabIsVisible();
  await homePage2.clickGlobalFeedTab();
  await homePage2.clickArticleByTitle(updatedTitle);

  await viewArticlePage2.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage2.assertArticleTextIsVisible(updatedText);
});
