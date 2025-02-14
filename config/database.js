import * as dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

export const database = mysql.createPool ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  queueLimit: 0
});

export function databaseStatus (req, res, next) {
  // Check database before running server
  database.getConnection()
  .then((conn) => {
    conn.release();
    next();
  })
  .catch((err) => {
    res.status(500).render('500')
  });
}
