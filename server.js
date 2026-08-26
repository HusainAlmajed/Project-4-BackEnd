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
const assetCtrl = require("./controllers/asset");
const agreementCtrl = require("./controllers/agreement");

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

// Asset Routes
app.get("/assets", verifyToken, assetCtrl.index);
app.post("/assets", verifyToken, assetCtrl.create);
app.get("/assets/:assetId", verifyToken, assetCtrl.show);
app.put("/assets/:assetId", verifyToken, assetCtrl.update);
app.delete("/assets/:assetId", verifyToken, assetCtrl.deleteAsset);

// Agreement Routes
app.get("/agreements", verifyToken, agreementCtrl.index);
app.post("/agreements", verifyToken, agreementCtrl.create);
app.get("/agreements/:agreementId", verifyToken, agreementCtrl.show);
app.put("/agreements/:agreementId", verifyToken, agreementCtrl.update);
app.delete("/agreements/:agreementId", verifyToken, agreementCtrl.deleteAgreement);


// Start server
app.listen(PORT, () => {
  console.log(`The Express app is ready on port ${PORT}! 😀`);
});
