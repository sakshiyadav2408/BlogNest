const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  markdown: { type: String, required: true },
  html: { type: String, required: true },
  tags: [String],
  comment: { type: String }, // NEW
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
