const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

const verifyToken = require("./middleware/verify-token");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`);
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Routes


// Start server
app.listen(PORT, () => {
  console.log(`The Express app is ready on port ${PORT}! 😀`);
});
