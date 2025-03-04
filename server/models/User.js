// Import necessary modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true }, // Username of the user
        fullName: { type: String, required: true }, // Full name of the user
        email: { type: String, required: true, unique: true }, // Email of the user, must be unique
        password: { type: String, required: true }, // Password of the user
        profileImageUrl: { type: String, default: null }, // URL of the user's profile image
        bookmarkedPolls: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Poll" }, // Array of bookmarked polls
        ],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // If password is not modified, skip hashing
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
    next(); // Proceed to the next middleware or save the document
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the hashed password
};

// Export the User model
module.exports = mongoose.model("User", UserSchema);
