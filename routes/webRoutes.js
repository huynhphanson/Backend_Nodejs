import express from 'express';
import { loginPage, registerPage, login, register, homePage } from '../controllers/webControllers.js';
import passport from 'passport';
import { validRegistration } from '../validation/user-valid.js';
import { initializePassport } from '../config/passport-local.js';
initializePassport(passport);


export const webRoutes = express.Router();

webRoutes.get('/', loginPage);
webRoutes.get('/register', registerPage);
webRoutes.get('/home', homePage);

webRoutes.post('/register', validRegistration, register);
webRoutes.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));

webRoutes.get('/auth/status', (req, res) => {
  console.log('req.user:\n', req.user, '\n');
  console.log('req.session:\n', req.session);
  req.user ? res.sendStatus(200) : res.sendStatus(401); 
})