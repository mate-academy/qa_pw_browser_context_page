import { test } from '../../_fixtures/fixtures';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.describe('View updated article', () => {
  let updatedArticle;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  const editArticlePage = new EditArticlePage(page1);
  const viewArticlePage = new ViewArticlePage(page1);
  updatedArticle = { ...articleWithoutTags, title: 'Updated ' + articleWithoutTags.title };

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(updatedArticle.title);
  await editArticlePage.clickUpdateArticleButton();
});

test('User can view an article updated by another user', async ({ page2, articleWithoutTags, user1 }) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await page2.reload({ waitUntil: 'domcontentloaded' });

  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
});