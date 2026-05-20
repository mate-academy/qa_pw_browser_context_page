import { HomePage } from '../../pages/HomePage';

export async function followArticle(page, user, article) {
    const homePage = new HomePage(page);

    await homePage.openGlobalFeedTab()
    await homePage.followArticle(user.username, article.title)
}