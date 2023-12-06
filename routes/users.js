
const mongoose = require('mongoose');
const plm=require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/my-pinterest-clone")
// Define the schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dp: {
    type: String, // You can store the URL or path to the user's profile picture
    default: 'default.jpg' // Default profile picture if none is provided
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // Assuming you have a 'Post' model for user's posts
  }],
  // Additional fields or configurations can be added as needed
});

userSchema.plugin(plm);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
