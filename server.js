const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

//middelware
const verifyToken = require("./middleware/verify-token");
const assetCtrl = require("./controllers/asset");
const agreementCtrl = require("./controllers/agreement");

//controllers
const authCtrl = require('./controllers/auth')
const inspectionCtrl = require("./controllers/inspection");
const documentCtrl = require("./controllers/document")

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
app.post("/sign-up/customer", authCtrl.customerSignUp)
app.post("/sign-up/owner", authCtrl.ownerSignUp)
app.post("/sign-in", authCtrl.signIn)
app.put("/users/:userId", verifyToken, authCtrl.update)
// Asset Routes
app.get("/assets", verifyToken, assetCtrl.index);


// Agreement Routes
app.get("/agreements", verifyToken, agreementCtrl.index);
app.post("/agreements", verifyToken, agreementCtrl.create);
app.get("/agreements/:agreementId", verifyToken, agreementCtrl.show);
app.put("/agreements/:agreementId", verifyToken, agreementCtrl.update);
app.delete("/agreements/:agreementId", verifyToken, agreementCtrl.deleteAgreement);

// Inspection Routes
app.get("/inspections", verifyToken, inspectionCtrl.index);
app.post("/inspections", verifyToken, inspectionCtrl.create);
app.get("/inspections/:inspectionId", verifyToken, inspectionCtrl.show);
app.put("/inspections/:inspectionId", verifyToken, inspectionCtrl.update);
app.delete("/inspections/:inspectionId", verifyToken, inspectionCtrl.deleteInspection);

// Document Routes
app.get("/documents", verifyToken, documentCtrl.index);
app.post("/documents", verifyToken, documentCtrl.create);
app.get("/documents/:documentId", verifyToken, documentCtrl.show);
app.put("/documents/:documentId", verifyToken, documentCtrl.update);
app.delete("/documents/:documentId", verifyToken, documentCtrl.deleteDocument);

// Start server
app.listen(PORT, () => {
  console.log(`The Express app is ready on port ${PORT}! 😀`);
});
