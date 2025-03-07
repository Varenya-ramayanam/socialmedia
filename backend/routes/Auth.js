const Router = require('express').Router();
const { signUp, logIn,logOut,getUserProfile} = require('../controllers/User.controller');

Router.post('/signup', signUp);
Router.post('/login', logIn);
Router.get('/logout', logOut);

module.exports = Router;