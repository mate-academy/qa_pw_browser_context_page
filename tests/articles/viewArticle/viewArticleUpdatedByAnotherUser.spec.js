import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

const newTitle = 'updated title ' + faker.lorem.sentence(2);

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  const viewArticlePage = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editTitleField(newTitle);
  await editArticlePage.clickUpdateArticleButton();
});

test('User can view an article updated by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
