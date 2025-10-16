const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = express();


app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("API is running...");
});


// ------------------- CRUD ROUTES -------------------

// GET - Return all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // find() = get all users from DB
    res.json(users); // send the users back as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Add a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body); // create new user from request body
    const savedUser = await newUser.save(); // save to DB
    res.status(201).json(savedUser); // send back the saved user
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PUT - Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // get ID from URL
      req.body, // updated data
      { new: true } // return the updated user
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE - Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
