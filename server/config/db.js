
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

if (process.env.DB_SSL === "true") {
  dbConfig.ssl = {
    ca: fs.readFileSync(
      path.join(__dirname, "../prisma/ca.pem"),
      "utf8"
    ),
    rejectUnauthorized: true,
  };
}

const pool = mysql.createPool(dbConfig);

// Check database connection

pool.getConnection()
  .then((connection) => {
    console.log("MySQL connection pool is ready.");
    connection.release();
  })

  .catch((error) => {
    console.error("MySQL connection failed:", error.message);
  });

module.exports = pool;









