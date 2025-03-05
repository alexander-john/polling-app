# Educational Guide for Polling App

## Table of Contents
1. [Introduction](#introduction)
2. [Project Architecture](#project-architecture)
3. [Setting Up the Project](#setting-up-the-project)
4. [Key Components](#key-components)
5. [Common Workflows](#common-workflows)
6. [Best Practices and Design Patterns](#best-practices-and-design-patterns)
7. [Detailed Code Explanations](#detailed-code-explanations)
8. [Additional Resources](#additional-resources)

## Introduction
Welcome to the Polling App educational guide! This document is designed to help you understand the structure, components, and workflows of the Polling App project. Whether you're a beginner or an experienced developer, this guide will provide valuable insights into how the project is built and how you can contribute.

## Project Architecture
The Polling App is a full-stack web application built with the following technologies:
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Tailwind CSS

### Directory Structure
```
polling-app/
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # React pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # Context API
│   │   └── utils/          # Utility functions
├── server/                 # Backend code
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── middleware/         # Express middleware
│   └── config/             # Configuration files
└── README.md               # Project overview
```

## Setting Up the Project
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/polling-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd polling-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     CLIENT_URL=http://localhost:3000
     ```

### Running the Application
1. Start the server:
   ```bash
   npm run server
   ```
2. Start the client:
   ```bash
   npm run client
   ```

## Key Components
### UserDetailsCard
The `UserDetailsCard` component displays detailed information about a user, including their profile picture, full name, username, and statistics such as the total number of polls created, voted on, and bookmarked.

### CharAvatar
The `CharAvatar` component displays a character avatar based on the user's full name if no profile picture is provided.

## Common Workflows
### Creating a Poll
1. Navigate to the "Create Poll" page.
2. Fill in the poll question and options.
3. Click "Create Poll" to submit.

### Voting on a Poll
1. Browse the available polls.
2. Select a poll to vote on.
3. Choose an option and submit your vote.

## Best Practices and Design Patterns
### Authentication Middleware
The `protect` middleware ensures that routes are only accessible to authenticated users. It checks for a valid JWT token and attaches the user information to the request object.

### Error Handling
The project uses centralized error handling to manage errors consistently across the application. Custom error classes and middleware are used to handle different types of errors.

## Detailed Code Explanations
### Poll Routes
The `pollRoutes.js` file defines the routes for poll-related operations. Each route is protected by the `protect` middleware to ensure only authenticated users can access it.

```javascript
// Route to create a new poll (protected route)
router.post("/create", protect, createPoll);

// Route to get all polls (protected route)
router.get("/getAllPolls", protect, getAllPolls);
```

### Poll Controller
The `pollController.js` file contains the logic for handling poll-related operations. For example, the `createPoll` function handles the creation of a new poll.

```javascript
const createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res.status(400).json({ message: "Invalid poll data" });
  }

  try {
    const poll = new Poll({
      question,
      options,
      creator: req.user.id,
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error creating poll", error: error.message });
  }
};
```

## Additional Resources
- [Express.js Documentation](https://expressjs.com/)
- [React.js Documentation](https://reactjs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)