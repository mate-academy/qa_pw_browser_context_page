import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { faker } from '@faker-js/faker';



test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  const viewArticlePage = new ViewArticlePage(page1);
  const createArticlePage = new CreateArticlePage(page1);
  const newArticleTitle = 'updated title ' + faker.string.alpha(5);

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
  await createArticle(page1, articleWithoutTags);
  articleWithoutTags.title = newArticleTitle;
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.clickUpdateArticleButton();
});

test('View an article updated by another user', async ({
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

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});

