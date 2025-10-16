//Import mongoose
const mongoose = require("mongoose");

// Create a Schema (a blueprint for how your user data looks)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
