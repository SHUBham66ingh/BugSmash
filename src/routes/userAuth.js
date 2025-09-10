const express = require('express');

const authRouter =  express.Router();

// register 
authRouter.post('/register' , register);
authRouter.post('/register' , login);
authRouter.post('/register' , logout);
authRouter.post('/register' , getProfile);
// login
//loginup
//getProfile

