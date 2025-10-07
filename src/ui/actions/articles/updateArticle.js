import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function updateArticle(page, articleUrl, updatedArticle) {
  const result = await test.step('Update existing article', async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await editArticlePage.open(articleUrl);
    await editArticlePage.submitEditArticleForm(updatedArticle);
    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);

    return {
      ...updatedArticle,
      url: viewArticlePage.url(),
    };
  });

  return result;
}
