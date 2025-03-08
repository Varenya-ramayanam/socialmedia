const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
    if (!res || !res.cookie) {
        console.error("Response object is undefined!");
        return;
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure in production
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

module.exports = generateToken;
