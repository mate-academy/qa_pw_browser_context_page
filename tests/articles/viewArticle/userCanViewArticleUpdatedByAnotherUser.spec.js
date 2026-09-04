import { generateNewArticleData } from "../../../src/common/testData/generateNewArticleData";
import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { test } from "../../_fixtures/fixtures";

let updatedArticleData;

test.beforeEach(async ({user1, user2, page1, page2, articleWithoutTags, logger, viewArticlePage, createArticlePage}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  updatedArticleData = generateNewArticleData(logger);
  updatedArticleData.title += Date.now();

  await viewArticlePage.open(articleWithoutTags.url)
  await viewArticlePage.clickOnEditArticleButton()

  await createArticlePage.fillTitleField(updatedArticleData.title);
  await createArticlePage.fillTextField(updatedArticleData.text);
  await createArticlePage.clickUpdateArticleButton() 
})

test('User can view an article updated by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticleData.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticleData.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
})