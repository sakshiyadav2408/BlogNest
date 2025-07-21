const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

// ✅ Get Admin Dashboard Stats
router.get("/stats", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Access denied" });

  try {
    const [totalPosts, totalUsers, totalComments, recentPosts] = await Promise.all([
      Post.countDocuments(),
      User.countDocuments(),
      Comment.countDocuments(),
      Post.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const tagSet = new Set();
    recentPosts.forEach(post => {
      (post.tags || []).forEach(tag => tagSet.add(tag));
    });

    const recent = recentPosts.map(post => `📄 <b>${post.title}</b> by ${post.authorName} on ${new Date(post.createdAt).toLocaleDateString()}`);

    res.json({
      totalPosts,
      totalUsers,
      totalComments,
      totalTags: tagSet.size,
      recent
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to load stats" });
  }
});

// ✅ Get All Users (Admin Only)
router.get("/users", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Promote a User to Admin
router.post("/users/:id/promote", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();
    res.json({ message: "User promoted", name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Failed to promote user" });
  }
});

// ✅ Delete a User
router.delete("/users/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// ✅ Delete a Post
router.delete("/posts/:id", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Access denied" });

  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
