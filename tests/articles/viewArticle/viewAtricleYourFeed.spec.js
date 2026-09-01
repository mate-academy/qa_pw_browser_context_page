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


test(`User can see other user's new articles in "Your Feed" after following their profile`, async ({
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage1 = new ViewArticlePage(page1);

  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage1.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage1.assertArticleAuthorNameIsVisible(user2.username);
  await viewArticlePage1.followArticleAuthor();
});

test(`User can see other user's new articles in "Your Feed" after unfollowing their profile`, async ({
  page1,
  page2,  
  user1,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage1 = new ViewArticlePage(page1);

  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage1.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage1.assertArticleAuthorNameIsVisible(user2.username);
  await viewArticlePage1.followArticleAuthor();
  await viewArticlePage1.unfollowArticleAuthor();
});