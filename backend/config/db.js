const mongoose = require('mongoose');
const uri = process.env.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected');
    } catch (error) {
        console.log('Error');
    }
};  

module.exports = connectDB;