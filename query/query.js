import * as dotenv from 'dotenv';
dotenv.config();

export const QUERY = {
  ADD_USER: `INSERT INTO ${process.env.DB_TABLE_NAME} (username, email, password, hashPass) VALUES (?, ?, ?, ?)`,
  SELECT_USERS: `SELECT * FROM ${process.env.DB_TABLE_NAME}`,
  SELECT_USER: `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE email = ?`,
  DELETE_USER: `DELETE FROM ${process.env.DB_TABLE_NAME} WHERE id = ?`,
}
