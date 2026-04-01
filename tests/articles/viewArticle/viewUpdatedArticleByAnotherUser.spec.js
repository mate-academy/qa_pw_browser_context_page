import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let viewArticlePage;
let viewArticlePage1;
let createArticlePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article updated by another user', async ({
  page2,
  page1,
  user1,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  viewArticlePage = new ViewArticlePage(page2);
  viewArticlePage1 = new ViewArticlePage(page1);
  createArticlePage = new CreateArticlePage(page1);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);

  await viewArticlePage1.clickEditArticle();

  await createArticlePage.submitCreateArticleForm(articleWithOneTag);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
