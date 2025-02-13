import bcrypt from 'bcrypt';
import { database } from '../config/database.js';
import { QUERY } from '../query/query.js';

export function homePage (req, res) {
  res.render('home');
}

export function loginPage (req, res) {
  res.render('loginPage');
};

export function registerPage (req, res) {
  res.render('registerPage');
}

export function register (req, res) {
  const errors = req.errors;
  if (!errors.length) {
    res.render('registerPage', {msg: 'Success!'});
  } else {
    res.render('registerPage', {errors});
  }
};

export async function login (req, res) {
  const errors = [];
  try {
    const {email, password} = req.body;
    if(!email || !password) errors.push('All Fill Requirements');
    if(!errors.length){
      let [results, fields] = await database.query(QUERY.SELECT_USER, [email]);
      if(!results.length){
        errors.push('Email not assigned')
        res.status(400).render('loginPage', {errors})
      } else {
        const matchPass = await bcrypt.compare(password, results[0].hashPass);
        if(!matchPass){
          errors.push('Password Incorrect')
          res.status(400).render('loginPage', {errors});
        } else {
          req.session.visited = true;
          req.session.user = results;
          // res.cookie({maxAge: 1000000, signed: true});
          res.status(200).redirect('home');
        }
      }
    } else {
      res.status(400).render('loginPage', {errors});
    }
  } catch(err) {
    errors.push('Database Errors');
    res.status(500).render('loginPage', {errors})
  }
};