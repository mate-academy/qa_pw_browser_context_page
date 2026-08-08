import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let updatedTitle;
let viewArticlePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  viewArticlePage = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);
  updatedTitle = faker.lorem.words();

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editTitleField(updatedTitle);
  await editArticlePage.clickUpdateArticleButton();
});

test('View an article updated by another user', async ({
  page2,
  articleWithoutTags,
}) => {
  // homePage.open() added per review request; user2 already lands on the
  // home page automatically after signUpUser(page2, user2) in beforeEach,
  // so this is a no-op confirmation step, not a functional fix.
  const homePage = new HomePage(page2);
  await homePage.open();

  viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
});
