// Summary:
// This file defines the routes for poll-related operations in the polling app.
// It includes routes for creating polls, fetching all polls, fetching polls the user has voted on, 
// fetching a poll by its ID, voting on a poll, closing a poll, bookmarking a poll, 
// fetching bookmarked polls, and deleting a poll.
// All routes are protected by authentication middleware to ensure they are only accessible to authenticated users.

// Import necessary modules and controllers
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createPoll,
  getAllPolls,
  getVotedPolls,
  getPollById,
  voteOnPoll,
  closePoll,
  bookmarkPoll,
  getBookmarkedPolls,
  deletePoll,
} = require("../controllers/pollController");

// Create a new router instance
const router = express.Router();

// Route to create a new poll (protected route)
router.post("/create", protect, createPoll);

// Route to get all polls (protected route)
router.get("/getAllPolls", protect, getAllPolls);

// Route to get polls the user has voted on (protected route)
router.get("/votedPolls", protect, getVotedPolls);

// Route to get a poll by its ID (protected route)
router.get("/:id", protect, getPollById);

// Route to vote on a poll (protected route)
router.post("/:id/vote", protect, voteOnPoll);

// Route to close a poll (protected route)
router.post("/:id/close", protect, closePoll);

// Route to bookmark a poll (protected route)
router.post("/:id/bookmark", protect, bookmarkPoll);

// Route to get polls bookmarked by the user (protected route)
router.get("/user/bookmarked", protect, getBookmarkedPolls);

// Route to delete a poll (protected route)
router.delete("/:id/delete", protect, deletePoll);

// Export the router
module.exports = router;