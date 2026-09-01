import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import {EditArticlePage} from "../../../src/ui/pages/article/EditArticlePage";
import {HomePage} from "../../../src/ui/pages/HomePage";

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});


test('User can view an updated article created by another user.', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
}) => {
  const updatedTitle = 'Updated article title';
  const updatedText = 'Updated article text';
  const viewArticlePage1 = new ViewArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);
  const editArticlePage = new EditArticlePage(page1);

  await viewArticlePage1.open(articleWithoutTags.url);
  await editArticlePage.open(articleWithoutTags.url);
  await editArticlePage.updateArticle(updatedTitle, updatedText);
  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage2.assertArticleTextIsVisible(updatedText);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
});


