const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Middleware to allow only admin
const adminOnly = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};

// GET ADMIN STATS
router.get("/stats", auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      totalUsers,
      totalProducts,
      totalOrders
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;