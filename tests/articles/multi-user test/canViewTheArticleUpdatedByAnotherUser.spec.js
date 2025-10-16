import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

let article;
let editArticlePage1;
let viewArticlePageUser2;
let homePageUser2;

test.beforeEach(async ({ page, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page, user1);
  await signUpUser(page2, user2);

  article = await createArticle(page, articleWithoutTags);
  editArticlePage1 = new EditArticlePage(page);
  viewArticlePageUser2 = new ViewArticlePage(page2);
  homePageUser2 = new HomePage(page2);
});

test('Can view an article updated by another user', async () => {
  const updatedTitle = faker.word.words(3);

  await editArticlePage1.clickEditArticleButton();
  await editArticlePage1.fillArticleTitleField(updatedTitle);
  await editArticlePage1.clickUpdateArticleButton();

  article.title = updatedTitle;
  await homePageUser2.clickGlobalFeed();
  await viewArticlePageUser2.openArticleFromGlobalFeed(article.title);

  await viewArticlePageUser2.assertArticleTitleIsVisible(article.title);
});

