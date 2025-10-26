const express = require('express');

const authRouter =  express.Router();
const {register , login } = require('../controllers/userAuthent');

// register 
authRouter.post('/register' , register);
authRouter.post('/login' , login);
authRouter.post('/logout' , logout);
authRouter.get('/getProfile' , getProfile);
// authRouter.post('/logout' , logout);
// authRouter.post('/getProfile' , getProfile);
// login
//loginup
//getProfile

module.exports = authRouter;

