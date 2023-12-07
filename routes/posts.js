const mongoose = require("mongoose");

// Define the schema for the post
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  // Assuming you want to associate each post with a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model
  },
  // Additional fields or configurations can be added as needed
});

// Create the Post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
