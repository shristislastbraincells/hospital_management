const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all receptionists
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.E_ID, e.Name, e.Salary, e.State, e.City, e.Pin_No
      FROM Employee e
      JOIN Receptionist r ON e.E_ID = r.E_ID
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching receptionists" });
  }
});

// GET one receptionist
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT e.E_ID, e.Name, e.Salary, e.State, e.City, e.Pin_No
      FROM Employee e
      JOIN Receptionist r ON e.E_ID = r.E_ID
      WHERE e.E_ID = ?
    `, [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Receptionist not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching receptionist" });
  }
});

// POST new receptionist (insert into Employee + Receptionist)
router.post("/", async (req, res) => {
  const { Name, Salary, State, City, Pin_No } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [employeeResult] = await connection.query(
      "INSERT INTO Employee (Name, Salary, State, City, Pin_No) VALUES (?, ?, ?, ?, ?)",
      [Name, Salary, State, City, Pin_No]
    );
    const eId = employeeResult.insertId;

    await connection.query("INSERT INTO Receptionist (E_ID) VALUES (?)", [eId]);

    await connection.commit();
    res.status(201).json({ message: "Receptionist added successfully!", E_ID: eId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Error adding receptionist" });
  } finally {
    connection.release();
  }
});

module.exports = router;
