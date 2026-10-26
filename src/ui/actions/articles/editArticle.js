import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(page, article, updatedArticle) {
  await test.step(`Edit an article`, async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.open(article.url);
    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.assertTitleFieldHasValue(article.title);
    await editArticlePage.submitUpdateArticleForm(updatedArticle);
    await viewArticlePage.open(article.url);
    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  });
}
