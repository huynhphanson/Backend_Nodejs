require('dotenv').config

const QUERY = {
  SIGN_UP: `INSERT INTO ${process.env.DB_TABLE_NAME} (username, email, password, hashPass) VALUES (?, ?, ?, ?)`,
  SELECT_USER: `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE email = ?`
}

module.exports = QUERY;