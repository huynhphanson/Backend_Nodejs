import express from 'express';
import { loginPage, registerPage, register, homePage} from '../controllers/webControllers.js';
import { admin, adminDel } from '../controllers/adminController.js';
import passport from 'passport';
import { validLogin, validRegistration } from '../validation/user-valid.js';
import { initializePassport } from '../config/passport-local.js';
import { checkDBConnection } from '../config/database.js';
import { checkAuthenticated, checkNotAuthenticated } from '../validation/check-authenticated.js';
initializePassport(passport);


export const webRoutes = express.Router();

webRoutes.get('/', checkNotAuthenticated, loginPage);
webRoutes.get('/register', registerPage);
webRoutes.get('/home', checkAuthenticated, homePage);
webRoutes.get('/admin', admin)

webRoutes.post('/register', validRegistration, register);
webRoutes.post('/login', checkDBConnection, validLogin, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));
webRoutes.delete('/admin/:id', adminDel)