const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    username: String,
    userID: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [
      {
        username: String,
        content: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;
