import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { test } from "../../_fixtures/fixtures";

let viewArticlePage;

test.beforeEach(async ({user1, user2, page1, page2, articleWithoutTags}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickOnTheFollowUserButton(user1.username)

})

test('User can unfollow the article created by another user', async ({user1}) => {
  
  await viewArticlePage.clickOnTheUnfollowUserButton(user1.username)
  await viewArticlePage.assertFollowUserButtonsAreVisible(user1.username)
})