import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function editArticle(page, articleUrl, article) {
  await test.step(`Edit an article`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.open(articleUrl);
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(article.title+ ' - updated');
    await editArticlePage.fillDescriptionField(article.description+ ' - updated');
    await editArticlePage.fillTextField(article.text+ ' - updated');
    await editArticlePage.clickUpdateButton();

   
  });

  return page.url();
}

