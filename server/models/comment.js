const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: String,
  body: String,
  date: Number,
});

module.exports = mongoose.model('Comment', commentSchema);
