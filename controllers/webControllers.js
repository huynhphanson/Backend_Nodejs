const path = require('path');
const bcrypt = require('bcrypt');
const database = require('../config/database.js');
const QUERY = require('../query/query.js');
const { error } = require('console');

const getSignInPage = (req, res) => {
  res.render('signInPage');
};

const getSignUpPage = (req, res) => {
  res.render('signUpPage');
}

const signUpUser = async (req, res) => {
  const errors = [];
  try{
    // Get data from SignUpPage
    const { userName, userEmail, userPassword, passwordConfirm} = req.body;
    if(!userName || !userEmail || !userPassword || !passwordConfirm) errors.push('All Fill Requirements');
    if(userPassword !== passwordConfirm) errors.push('Password Not Match');
    if(userPassword.length < 6 && userPassword > 0 ) errors.push('Password At Least 6 Characters');
  
    if(!errors.length){
      let [results, fields] = await database.query(
        QUERY.SELECT_USER, [`${userEmail}`]
      );
      if(!results.length){
        // Hash password
        const saltRounds = 10; // 10 digits for bcrypt
        const hashPassword = await bcrypt.hash(userPassword, saltRounds);
  
        let [results, fields] = await database.query(
          QUERY.SIGN_UP, [userName, userEmail, userPassword, hashPassword]
        );
        res.render('signUpPage', {errors: 'Success!'});
      } else {
        errors.push('Email Already Assign!');
        res.render('signUpPage', {errors})
      }
    } else {
      res.render('signUpPage', {errors})
    }
  } catch (err) {
    errors.push('Database Error');
    res.render('signUpPage', {errors})
  }
};

const signInUser = async (req, res) => {
  const errors = [];
  try {
    const {userEmail, userPassword} = req.body;
    if(!userEmail || !userPassword) errors.push('All Fill Requirements');
    if(!errors.length){
      let [results, fields] = await database.query(QUERY.SELECT_USER, [userEmail]);
      if(!results.length){
        errors.push('Email not assigned')
        res.render('signInPage', {errors})
      } else {
        const matchPass = await bcrypt.compare(userPassword, results[0].hashPass);
        if(!matchPass){
          errors.push('Password Incorrect')
          res.render('signInPage', {errors});
        } else {
          res.render('home', {errors: 'Success'});
        }
      }
    } else {
      res.render('signInPage', {errors});
    }
  } catch(err) {
    errors.push('Database Errors');
    res.render('signInPage', {errors})
  }
};






module.exports = {
  getSignInPage,
  getSignUpPage,
  signUpUser,
  signInUser,
}