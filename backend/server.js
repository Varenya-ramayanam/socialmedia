const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cors = require('cors');
connectDB();
const AuthRoute = require('./routes/Auth');
const port = process.env.PORT || 5000;

const app = express();

// ✅ CORS Middleware should be before routes
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Now define routes
app.use('/auth', AuthRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
