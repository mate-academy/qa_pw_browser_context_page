import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { faker } from '@faker-js/faker';

let newArticleTitle;

test.beforeEach(async ({ page1, user1, page2, user2, articleWithoutTags }) => {
  newArticleTitle = faker.lorem.word();

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created in Global Feed', async ({
  page2, articleWithoutTags, page1
}) => {
  const viewArticlePage1 = new ViewArticlePage(page1);
  const createArticlePage = new CreateArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage1.clickEditArticleButon();
  await createArticlePage.fillTitleField(newArticleTitle);
  await createArticlePage.clickUpdatehArticleButton();

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(newArticleTitle);
}); 