require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());

// DB Connection
connectDB();
console.log("ENV CHECK:", process.env.MONGO_URI);
// Routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// Protected Route
const authMiddleware = require("./src/middleware/authMiddleware");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You accessed protected route!" });
});

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
app.listen(3000, () => console.log("Server started on port 3000"));