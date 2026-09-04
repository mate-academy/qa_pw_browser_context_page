import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { test } from "../../_fixtures/fixtures";

test.beforeEach(async ({user1, user2, page1, page2, articleWithoutTags}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
})

test('User can follow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickOnTheFollowUserButton(user1.username)
  await viewArticlePage.assertUnfollowUserButtonsAreVisible(user1.username)
})