# View Article Multi-User Tests

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`

## Task

1. Automate the multi-user test: 

    - *User can view an article created by another user in the Global Feed.*
    - *User can follow the article created by another user.*
    - *User can unfollow the article created by another user.*
    - *User can view an article updated by another user.*
    - *User can see other user's new articles in "Your Feed" after following their profile.*
    - *User doesn't see other user's articles in "Your Feed" after unfollowing their profile.*

2. Automate the test for a single user working in two contexts:

    - *User can sign in with changed in profile password.*
    - *User can see own article in "Global feed" when not logged in.*

    Use the following example tests as templates:
   
    - `viewArticleCreatedByAnotherUser.spec.js`
    - `signInPositive.spec.js`
    
3. Re-run all your tests and ensure they pass after the updates. 

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
