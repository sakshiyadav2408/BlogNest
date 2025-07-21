const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId:     { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  authorId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true }, // ✅ Comma here
  text:       { type: String, required: true }  // ✅ This line is now valid
}, { timestamps: true });


module.exports = mongoose.model("Comment", commentSchema);