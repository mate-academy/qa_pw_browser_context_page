export async function openCurrentUserProfileByCreatedArticle(homePage, userName, titleText) {
    await homePage.open()
    await homePage.openGlobalFeedTab()

    await homePage.clickCurrentUserProfile(userName, titleText)
}