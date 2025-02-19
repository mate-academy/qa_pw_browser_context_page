# Practice task: View article multi-user tests

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b added_article_test
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Automate the multi-user test: 
- User can view an article created by another user In Global Feed.
- User can follow the article created by another user.
- User can unfollow the article created by another user.
- User can view an article updated by another user. 
- User can view new article in "Your Feed" after following another user profile.
- User don't see articles in "Your Feed" after unfollowing another user profile.
2. Automate the test for single user working in two contexts:
- User can sign in with changed in profile password.
- User can see own article in "Global feed" when not logged in.
3. Use test examples:
- View an article created by another user.
- Successful "Sign in" flow test.
4. Re-run all your tests and ensure they pass after the updates. 

## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

