const router = require("express").Router();
const auth   = require("../middleware/auth");
const Post   = require("../models/Post");
const Comment= require("../models/Comment");

// All posts
router.get("/", async (_, res) => res.json(await Post.find().sort({ createdAt: -1 })));

// Single user posts
router.get("/user/:id", async (req, res) =>
  res.json(await Post.find({ authorId: req.params.id }).sort({ createdAt: -1 }))
);

// Create post
router.post("/", auth, async (req, res) => {
  const { title, markdown, html, tags } = req.body;
  const p = await Post.create({
    title, markdown, html, tags,
    authorId: req.user.id,
    authorName: req.user.name
  });
  res.status(201).json(p);
});

// Comments
router.get("/:id/comments", async (req, res) =>
  res.json(await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 }))
);

router.post("/:id/comments", auth, async (req, res) => {
  const { text } = req.body;
  const c = await Comment.create({
    postId: req.params.id,
    authorId: req.user.id,
    authorName: req.user.name,
    text
  });
  res.status(201).json(c);
});

module.exports = router;