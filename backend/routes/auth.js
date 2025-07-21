const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ error: "Email already used" });
  }

  const isAdmin = email === "admin@gmail.com"; // your admin identity
  const u = await User.create({ name, email, password, isAdmin });

  res.status(201).json({ message: "User created", id: u._id });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const u = await User.findOne({ email });

    if (!u || !(await u.compare(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: u._id, isAdmin: u.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: u._id,
        name: u.name,
        email: u.email,
        isAdmin: u.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
