import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

let article1;
let article2;
let viewArticlePageUser2;
let homePageUser2;

test.beforeEach(async ({ page, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page, user1);
  await signUpUser(page2, user2);

  article1 = await createArticle(page, articleWithoutTags);
  viewArticlePageUser2 = new ViewArticlePage(page2);
  homePageUser2 = new HomePage(page2);
});

test('can see other users new articles in "Your Feed" after following their profile', async ({
  page,
  user1,
}) => {
  await homePageUser2.clickGlobalFeed();
  await viewArticlePageUser2.openArticleFromGlobalFeed(article1.title);
  await viewArticlePageUser2.clickFollowArticle(user1.username);

  await viewArticlePageUser2.assertArticleTitleIsVisible(article1.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(article1.text);
  await viewArticlePageUser2.assertUserFollowedTheArticle(article1.username);

  const secondArticleData = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tags: []
  };

  article2 = await createArticle(page, secondArticleData);

  await viewArticlePageUser2.clisckAuthorLinkInArticleHeader(user1.username);

  await viewArticlePageUser2.openArticleFromGlobalFeed(article2.title);

  await viewArticlePageUser2.assertArticleTitleIsVisible(article2.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(article2.text);
});
