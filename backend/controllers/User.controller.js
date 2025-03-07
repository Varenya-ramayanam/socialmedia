const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../jwt/generateToken");
const JWT_SECRET = process.env.TOKEN; // Store in environment variables for security

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error signing up", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        generateToken(userExist._id,res);
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error("Error logging in", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logOut = (req, res) => {
    res.clearCookie("jwtoken");
    res.status(200).json({ message: "User logged out successfully" });
};

const getUserProfile = async (req, res) => {
    try {
        const allUsers = await User.find().select("-password");
        res.status(201).json(allUsers);
    } catch (error) {
        console.error("Error in allUsers controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { signUp, logIn, logOut,getUserProfile };
