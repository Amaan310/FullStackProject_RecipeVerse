const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const finalUsername = name; 

        if (!finalUsername || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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