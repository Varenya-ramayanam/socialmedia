const jwt = require("jsonwebtoken");


const generateToken = (id,res) => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
        expiresIn: "1h"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3600000
    });
};      

module.exports = generateToken;