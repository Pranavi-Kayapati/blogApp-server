const express = require("express");
const blogRouter = express.Router();
const { auth } = require("../middlewares/auth.middleware");
const BlogModel = require("../models/blogModal");

blogRouter.get("/", async (req, res) => {
  const titleQuery = req.query.title;
  const categoryQuery = req.query.category;
  const sortQuery = req.query.sort;
  try {
    let blogs;
    const query = {};
    if (titleQuery) {
      query.title = { $regex: titleQuery, $options: "i" };
    }
    if (categoryQuery) {
      query.category = categoryQuery;
    }
    blogs = await BlogModel.find(query);

    if (blogs.length === 0) {
      return res
        .status(400)
        .json({ msg: "No blogs found with specified data" });
    }

    if (sortQuery === "asc") {
      blogs = blogs.sort((a, b) => a.date - b.date);
    } else if (sortQuery === "desc") {
      blogs = blogs.sort((a, b) => b.date - a.date);
    }
    res.send(blogs);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

blogRouter.post("/", auth, async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(200).send({ message: "Blog Added successfully", blog: blog });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

blogRouter.patch("/:id", auth, async (req, res) => {
  try {
    const newBlog = await BlogModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res
      .status(200)
      .send({ message: "blog Updated Sucessfully", blog: req.body });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

blogRouter.delete("/:id", auth, async (req, res) => {
  try {
    const newBlog = await BlogModel.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .send({ message: "blog Updated Sucessfully", blog: newBlog });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

module.exports = blogRouter;
