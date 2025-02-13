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

// Check database before running server
database.getConnection()
  .then((conn) => {
    console.log("✅ Database connected successfully!");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Cannot connect to database:", err.code);
    process.exit(1); // Dừng server nếu database chưa kết nối
  });
