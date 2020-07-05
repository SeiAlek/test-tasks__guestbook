const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(
  'mongodb+srv://alem:BJPDZURC9Mf9kDuZ@alem-questbook.zhs7n.mongodb.net/alem-questbook?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server started on port ${PORT}!`);
});
