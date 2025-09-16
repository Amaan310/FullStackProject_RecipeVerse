const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // allow both "username" or "name"
    const finalUsername = username || name;

    if (!finalUsername || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username: finalUsername,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // return safe user (no password)
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    return res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
