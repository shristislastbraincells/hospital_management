const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "shristi",
  database: "HospitalDB",
});

db.getConnection()
  .then(() => console.log("✅ Connected to MySQL HospitalDB"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = db;
