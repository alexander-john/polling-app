// Summary:
// This file sets up and configures an Express.js server for the polling app. 
// It includes middleware for handling CORS and JSON request bodies, connects to the database, 
// defines routes for authentication and polls, serves static files from the uploads folder, 
// and starts the server on a specified port.

// Import necessary modules
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");
const connectDB = require("./config/db");

// Initialize the Express application
const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allow requests from the client URL or any origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to the database
connectDB();

// Define routes for authentication and polls
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// Serve the uploads folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
