const router = require("express").Router();
const auth   = require("../middleware/auth");
const User   = require("../models/User");

// Only admin role can view all users
router.get("/", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "No permission" });
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

module.exports = router;
