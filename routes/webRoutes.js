const express = require('express');
const { getSignInPage, getSignUpPage, signUpUser, signInUser } = require('../controllers/webControllers.js');


const webRouter = express.Router();

webRouter.get('/', getSignInPage);
webRouter.get('/signin', getSignInPage);
webRouter.get('/signup', getSignUpPage);
webRouter.post('/signUpUser', signUpUser);
webRouter.post('/signInUser', signInUser);

module.exports = webRouter;