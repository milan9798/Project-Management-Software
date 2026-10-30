
// require("dotenv").config();

// const app = require("./app");
// const db = require("./config/db");

// const PORT = process.env.PORT || 5000;

// async function startServer() {
//   try {
//     const connection = await db.getConnection();

//     await connection.query("SELECT 1");
//     console.log("MySQL connected successfully!");

//     connection.release();

//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//     process.exit(1);
//   }
// }

// startServer();





require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  let connection;

  try {
    connection = await db.getConnection();

    const [dbInfo] = await connection.query(`
      SELECT
        DATABASE() AS database_name,
        @@hostname AS server_name,
        @@port AS server_port
    `);

    console.log("MySQL connected successfully!");
    console.log("Database information:", dbInfo[0]);

    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'users'"
    );

    console.log(
      "Users table available:",
      tables.length > 0
    );

    connection.release();
    connection = null;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    if (connection) {
      connection.release();
    }

    process.exit(1);
  }
}

startServer();

