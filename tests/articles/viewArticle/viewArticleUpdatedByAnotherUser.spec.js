import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article updated by another user', async ({
  page2,
  user1,
  articleWithoutTags,
  page1,
  logger,
}) => {
  const viewArticlePage = new ViewArticlePage(page1);
  const createArticlePage = new CreateArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);
  const homePage2 = new HomePage(page2);

  await homePage2.clickGlobalFeedTab();
  await homePage2.assertGlobalFeedTabIsActive();
  await homePage2.clickArticleByTitle(articleWithoutTags.title);
  await expect(page2).toHaveURL(/article/);
  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
  const newArticleText = generateNewArticleData(logger).text;

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickEditArticleButton();
  await expect(page1).toHaveURL(/editor/);
  await createArticlePage.fillTextField(newArticleText);
  await createArticlePage.clickUpdateArticleButton();

  await page2.reload();
  await viewArticlePage2.assertArticleTextIsVisible(newArticleText);
});
