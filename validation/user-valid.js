import bcrypt from 'bcrypt';
import { QUERY } from "../query/query.js";
import { database } from "../config/database.js";

export const validRegistration = async (req, res, next) => {
  const errors = [];
  req.errors = errors;
  const { username, email, password, passwordConfirm} = req.body;
  if(!username || !email || !password || !passwordConfirm) errors.push('All Fill Requirements');
  if(password !== passwordConfirm) errors.push('Password Not Match');
  if(password.length < 6 && password > 0 ) errors.push('Password At Least 6 Characters');
  if(!errors.length) {
    try {
      let [results, fields] = await database.query(QUERY.SELECT_USER, [`${email}`]);
      if(!results.length){
        // Hash password
        const saltRounds = 10; // 10 digits for bcrypt
        const hashPassword = await bcrypt.hash(password, saltRounds);
        
        let [results, fields] = await database.query(
          QUERY.SIGN_UP, [username, email, password, hashPassword]
        );
        next()
      } else {
        errors.push('Email Already Assign!');
        next();
      }
    } catch (err) {
      errors.push('Database Errors. Please Comback later!')
      next();
    }
  } else {
    next();
  }
}