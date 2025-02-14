import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { database } from './database.js';
import { QUERY } from '../query/query.js';



export function initializePassport(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
      try {
        let [results, fields] = await database.query(QUERY.SELECT_USER, [email]);
        if(!results.length) return done(null, false, { message: 'No User Found'});
        if(!await bcrypt.compare(password, results[0].hashPass)) return done(null, false, { message: 'Password Incorrect'});
        done(null, results);
      } catch (err) {
        console.error("❌ Database error:", err);
        if (err.code === 'ECONNREFUSED') {
          return done(null, false, {message: "lỗi database"})
        }
        return done(null, false, {message: "Internal Server Error"})
      }
    })
  );
  passport.serializeUser((results, done) => {
    console.log('Inside Serialize User:');
    console.log(results);
    done(null, results[0].email)
  });
  passport.deserializeUser( async (email, done) => {
    console.log('Inside Deserialize User');
    console.log(`Deserialize user email: ${email}`);
    let [results, fields] = await database.query(QUERY.SELECT_USER, [email]);
    if(!results.length) throw new Error('User not Found');
    done(null, results);
  })
} 
