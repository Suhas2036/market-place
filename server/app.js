const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); 

// Static uploads
app.use("/uploads", express.static("uploads"));

// DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));

// Razorpay
app.use("/api/payment", require("./routes/paymentRoutes"));