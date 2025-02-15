import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import { checkDBConnection } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function configViewEngine (app) {
  app.set('views', path.join(__dirname, '..', 'public', 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(cookieParser('huynhphantuyson'));
  app.use(session({
    secret: 'HuynhPhanTuySon',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(checkDBConnection);
}