// Summary:
// This file defines the routes for user authentication and image upload in the polling app. 
// It includes routes for user registration, login, fetching user information, and uploading images. 
// The routes are connected to their respective controller functions and middleware for handling authentication and file uploads. 
// The router is then exported for use in the main server file.

// Import necessary modules and controllers
const express = require("express");
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create a new router instance
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to get user information (protected route)
router.get("/getUser", protect, getUserInfo);

// Route to upload an image
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({ imageUrl });
});

// Export the router
module.exports = router;
