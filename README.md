

# Guestbook

[DEMO LINK](https://alem-guestbook.herokuapp.com/)


## Task Description


A guestbook is a section of a website. In a guestbook, visitors can read comments by other visitor or leave their own comment. For example, you can think of a student who created a website about Japan to share some thoughts about Japan culture and learn how to create a website. Then the student want  a Guestbook just to chat with fellow students there and so that they will be able leave comments.

Your task is to create a one-page Guestbook web application.

Users of this application should be able to

1. visit the application website
2. read comments by other visitors
3. leave their own comments

To leave the comment, a user is to provide a name, comment and to click "Post comment" button.

## Implementation details

### One page and no page reload

Guestbook a single page web application. It means, a user should be able to post a comment without page being reloaded. Another name for this programming approach is AJAX.

It's ok if user reloads the page to see the new comments.

Please consider [window.fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) as it's a modern and easy way to implement AJAX-approach.

### Technologies

In JobEasy we extensively use JavaScript to create our products.

Please use [node.js](https://nodejs.org/en/) as a back-end server; [express.js](http://expressjs.com/) or [moleculer.js](https://moleculer.services/) as a back-end framework.

In JobEasy we use [react.js](https://reactjs.org/) as a front-end framework.

You can store the messages data in memory using JavaScript array.

### Futher considerations

To show some other skills you have can create a bit more sofisticated application. For example, after creating the basic version of Guestbook web application you may want to:

1. Add database support to save message as the server restarts. In JobEasy we use sequalize
2. Make application look nice. For this purpose you may use material ui or bootstrap.
3. Use git to store and share source code of the application. Use bitbucket or github for this purposes. It's ok to share this application's code with other people. JobEasy has no commercial intent to use your codign assignment application.
4. Deploy application to production using free heroku or firebase account.

Please, do not overcomplicate the application. Among other things we consider how much time it takes you to implement the Guestbook.
