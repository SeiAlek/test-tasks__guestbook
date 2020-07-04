const express = require('express');
const bodyParser = require('body-parser');
const { getComments, addComment } = require('./server/comments');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/comments', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json(getComments());
});

app.post('/api/comments', bodyParser.text(), (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  addComment(JSON.parse(req.body));

  const comments = getComments();

  res.json(comments[comments.length - 1]);
});

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
