import bcrypt from 'bcrypt';
import { QUERY } from "../query/query.js";
import { database } from "../config/database.js";
import validator from 'validator';

export async function validRegistration (req, res, next) {
  try {
    const missingFields = [];
    const { username, email, password, passwordConfirm } = req.body;
    if (!username) missingFields.push("Tên người dùng");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Mật khẩu");
    if (!passwordConfirm) missingFields.push("Xác nhận mật khẩu");

    if(missingFields.length > 0) {
      req.flash('error', `Vui lòng điền: ${missingFields}`);
      return res.status(400).redirect('/register');
    };
    if(!validator.isEmail(email)) {
      req.flash('error', 'Email không hợp lệ')
      return res.status(400).redirect('/register');
    };
    if(password !== passwordConfirm) {
      req.flash('error', 'Mật khẩu không trùng');
      return res.status(400).redirect('/register');
    };
    if(password.length < 6) {
      req.flash('error', 'Mật khẩu tối thiểu 6 ký tự');
      return res.status(400).redirect('/register');
    };

    let [results, fields] = await database.query(QUERY.SELECT_USER, [`${email}`]);
    if(!results.length){
      // Hash password
      const saltRounds = 10; // 10 digits for bcrypt
      const hashPassword = await bcrypt.hash(password, saltRounds);
      
      await database.query(
        QUERY.ADD_USER, [username, email, password, hashPassword]
      );
      next()
    } else {
      req.flash('error', 'Email đã đăng ký')
      res.status(409).redirect('/register');
    }
  } catch (err) {
    req.flash('error', 'Lỗi Database')
    res.status(500).redirect('/register');
  }
}

export function validLogin (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Thiếu thông tin');
    return res.render('loginPage');
  }
  if (!validator.isEmail(email)) {
    req.flash('error', 'Email không hợp lệ');
    return res.render('loginPage');
  }
  next();
}